import os
import pathlib
import importlib.metadata
import typing

import fastapi
import fastapi.middleware.cors
import fastapi.staticfiles
import fastapi_azure_auth.user
import azure.identity
import azure.cosmos
import azure.cosmos.exceptions
import azure.storage.blob

from .config import Config
from .model import User, StatusResponse, XmasException

try:
    __version__ = importlib.metadata.version('mrmat-xmas-2023')
except importlib.metadata.PackageNotFoundError:
    # You have not yet installed this as a package, likely because you're hacking on it in some IDE
    __version__ = '0.0.0.dev0'
__config_file__ = pathlib.Path('~/etc/mrmat-xmas-2023.yml').expanduser()
__content_type_map__ = {
    'image/jpeg': 'jpeg',
    'image/png': 'png',
}

config = Config(__config_file__)
app_credential = azure.identity.DefaultAzureCredential()
cosmos_client = azure.cosmos.CosmosClient(url=config.cosmos_endpoint, credential=app_credential)
xmas_cosmos_client = cosmos_client.get_database_client(config.cosmos_db).get_container_client(config.cosmos_container)
container_client = azure.storage.blob.ContainerClient(account_url=config.container_endpoint,
                                                      container_name=config.container_name,
                                                      credential=app_credential)

app = fastapi.FastAPI(
    swagger_ui_oauth2_redirect_url='/oauth2-redirect',
    swagger_ui_init_oauth={
        'usePkceWithAuthorizationCodeGrant': True,
        'clientId': config.openapi_client_id
    }
)
# if config.backend_cors_origins:
app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    # allow_origins=[str(origin) for origin in config.backend_cors_origins],
    allow_origins=['http://localhost:8000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'])
azure_scheme = fastapi_azure_auth.SingleTenantAzureAuthorizationCodeBearer(
    app_client_id=config.backend_client_id,
    tenant_id=config.tenant_id,
    allow_guest_users=True,
    scopes={
        'api://xmas-backend/user_impersonation': 'user_impersonation',
        'api://xmas-backend/admin': 'admin'
    }
)


@app.on_event('startup')
async def startup() -> None:
    await azure_scheme.openid_config.load_config()


@app.on_event('shutdown')
async def shutdown() -> None:
    if container_client:
        container_client.close()


@app.exception_handler(XmasException)
async def xmas_exception_handler(request: fastapi.Request, exc: XmasException):
    return fastapi.responses.JSONResponse(status_code=exc.code,
                                          content={'msg': exc.msg},
                                          headers={'Xmas-Version': __version__})


@app.get('/api/users/{user_id:str}', response_model=User)
async def get_user(user_id: str) -> User:
    try:
        entry = xmas_cosmos_client.read_item(item=user_id, partition_key=user_id)
        user = model.User.from_cosmos(entry)
    except azure.cosmos.exceptions.CosmosHttpResponseError:
        user = model.User(id='0', name='Stranger', greeting='Happy Holidays')
    return user


@app.get('/api/users/{user_id:str}/picture', response_class=fastapi.Response)
async def get_user_picture(user_id: str):
    user = await assert_user(user_id)
    blob_client = container_client.get_blob_client(blob=user.id)
    if not blob_client.exists():
        raise XmasException(code=404, msg='No user picture')
    media = blob_client.get_blob_properties().get('content_settings', {}).get('content_type')
    if media is None:
        raise XmasException(code=500, msg='Invalid content type on the picture')
    content = blob_client.download_blob().readall()
    return fastapi.Response(content=content, media_type=media)


@app.post('/api/users/{user_id:str}/picture', response_model=StatusResponse)
async def post_user_picture(user_id: str, file: fastapi.UploadFile):
    if file.content_type not in __content_type_map__.keys():
        raise XmasException(code=400, msg='You must upload a jpeg or png image')
    user = await assert_user(user_id)
    with container_client.get_blob_client(blob=user.id) as blob_client:
        content = file.file.read()
        blob_client.upload_blob(data=content,
                                overwrite=True,
                                content_settings=azure.storage.blob.ContentSettings(content_type=file.content_type))
    return StatusResponse(code=200, msg='Picture successfully uploaded')


@app.get('/api/users',
         response_model=typing.List[User],
         dependencies=[fastapi.Security(azure_scheme, scopes=['admin'])])
async def admin_list_users():
    results = xmas_cosmos_client.query_items(
        query="SELECT x.id, x.name, x.greeting, x.language FROM xmas x WHERE x.year = @year",
        parameters=[{'name': '@year', 'value': 2023}],
        enable_cross_partition_query=True)
    users = [User.from_cosmos(entry) for entry in results]
    return users


@app.post('/api/users',
          response_model=User,
          dependencies=[fastapi.Security(azure_scheme, scopes=['admin'])])
async def admin_create_user(user: User):
    user.id = None
    created = xmas_cosmos_client.create_item(body=user.model_dump(), enable_automatic_id_generation=True)
    created_user = User.from_cosmos(created)
    return created_user


@app.get('/api/healthz')
async def healthz():
    return {'status': 'OK', 'version': __version__}


app.mount('/',
          fastapi.staticfiles.StaticFiles(directory=os.path.join(os.path.dirname(__file__), 'static'), html=True),
          name='static')


async def assert_user(code: str) -> User:
    """
    Utility to assert whether we know a user coming along with code authentication
    Args:
        code: Code we know the user with

    Returns:
        A User data structure
    Raises:
        XmasException when the user is not known
    """
    user = await get_user(code)
    if user.id == 0:
        raise XmasException(code=401, msg="I'm afraid I don't know you. Happy holidays anyway")
    return user
