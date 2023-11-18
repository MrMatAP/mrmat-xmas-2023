import os
import typing
import importlib.metadata
import pathlib
import logging

import azure.cosmos
import azure.cosmos.exceptions
import azure.storage
import azure.monitor.opentelemetry
import opentelemetry
import fastapi
import fastapi.staticfiles
import fastapi.middleware.cors
import fastapi_azure_auth.user

from .config import Config
from .dependencies import AppIdentity, CosmosContainerClient, BlobContainerClient
from .model import User, StatusResponse, HealthzResponse, XmasException

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

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

VERSION_HEADER = 'X-Version'
config = Config(__config_file__)
app_identity = AppIdentity()
cosmos_container_client = CosmosContainerClient(config, app_identity)
blob_container_client = BlobContainerClient(config, app_identity)
azure_scheme = fastapi_azure_auth.SingleTenantAzureAuthorizationCodeBearer(
    app_client_id=config.backend_client_id,
    tenant_id=config.tenant_id,
    allow_guest_users=True,
    scopes={
        'api://xmas-backend/user_impersonation': 'user_impersonation',
        'api://xmas-backend/admin': 'admin'
    }
)
azure.monitor.opentelemetry.configure_azure_monitor(
    connection_string=config.telemetry_connection_string,
    credential=app_identity()
)
tracer = opentelemetry.trace.get_tracer(__name__)


def validate_admin(user: fastapi_azure_auth.user.User = fastapi.Depends(azure_scheme)) -> fastapi_azure_auth.user.User:
    """
    Validate whether an authenticated user either has the admin scope set or the Test.Admin role
    Args:
        user: The authenticated user object
    Raises:
        InvalidAuth when unauthorised
    """
    if 'Test.Admin' in user.roles or 'admin' in user.scp:
        return user
    raise fastapi_azure_auth.auth.InvalidAuth('User lacks admin permissions')


def validate_user(code: str) -> User:
    """
    Validate whether a code-authenticated user exists and return it
    Args:
        code: The user code provided

    Returns:
        A user object
    """
    try:
        xmas_container_client = cosmos_container_client()
        user = xmas_container_client.read_item(item=code, partition_key=code)
        return User.from_cosmos(user)
    except azure.cosmos.exceptions.CosmosHttpResponseError:
        raise XmasException(code=401, msg='Hello Stranger')


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
    allow_origins=['https://mrmat-xmas.azurewebsites.net', 'http://localhost:8000', 'http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*', 'DELETE'],
    allow_headers=['*'])


@app.middleware('common-headers')
async def add_common_headers(request: fastapi.Request, call_next):
    response = await call_next(request)
    response.headers[VERSION_HEADER] = __version__
    return response


@app.on_event('startup')
async def startup() -> None:
    await azure_scheme.openid_config.load_config()


@app.on_event('shutdown')
async def shutdown() -> None:
    blob_container_client.close()
    app_identity.close()


@app.exception_handler(XmasException)
async def xmas_exception_handler(request: fastapi.Request, exc: XmasException):
    return fastapi.responses.JSONResponse(status_code=exc.code,
                                          content=StatusResponse(status=exc.code, msg=exc.msg).model_dump())


@app.exception_handler(azure.cosmos.exceptions.CosmosHttpResponseError)
async def cosmos_exception_handler(request: fastapi.Request, exc: azure.cosmos.exceptions.CosmosHttpResponseError):
    return fastapi.responses.JSONResponse(status_code=exc.status_code,
                                          content=StatusResponse(status=exc.status_code, msg=exc.exc_msg).model_dump())


@app.exception_handler(fastapi.exceptions.RequestValidationError)
async def validation_exception_handler(request: fastapi.Request, exc: fastapi.exceptions.RequestValidationError):
    return fastapi.responses.JSONResponse(status_code=422,
                                          content=StatusResponse(status=422, msg=exc.errors()).model_dump())


@app.get('/api/users',
         summary='Return a list of registered users for those with admin authorisation',
         response_model=typing.List[User])
async def list_users(caller: typing.Annotated[fastapi_azure_auth.user.User, fastapi.Depends(validate_admin)]):
    cosmos_client = cosmos_container_client()
    results = cosmos_client.query_items(
        query="SELECT * FROM xmas x WHERE x.year = @year",
        parameters=[{'name': '@year', 'value': 2023}],
        enable_cross_partition_query=True)
    users = [User.from_cosmos(entry) for entry in results]
    return users


@app.get('/api/users/{code:str}',
         summary='Return user information for a given code',
         response_model=User)
async def get_user(caller: typing.Annotated[User, fastapi.Depends(validate_user)]) -> User:
    return caller


@app.post('/api/users',
          summary='Create a user',
          response_model=User)
async def create_user(user: User,
                      caller: typing.Annotated[fastapi_azure_auth.user.User, fastapi.Depends(validate_admin)]):
    cosmos_client = cosmos_container_client()
    user.id = None
    created = cosmos_client.create_item(body=user.model_dump(), enable_automatic_id_generation=True)
    created_user = User.from_cosmos(created)
    return created_user


@app.put('/api/users/{code:str}',
         summary='Update a user',
         response_model=User)
async def update_user(update: User,
                      caller: typing.Annotated[User, fastapi.Depends(validate_user)]):
    cosmos_client = cosmos_container_client()
    caller.userMessage = update.userMessage
    updated = cosmos_client.upsert_item(caller.model_dump())
    return User.model_validate(updated)


@app.get('/api/users/{code:str}/picture',
         summary='Return the users picture',
         response_class=fastapi.Response)
async def get_user_picture(caller: typing.Annotated[User, fastapi.Depends(validate_user)]):
    sto_client = blob_container_client()
    blob_client = sto_client.get_blob_client(blob=caller.id)
    if not blob_client.exists():
        raise XmasException(code=404, msg='No user picture')
    media = blob_client.get_blob_properties().get('content_settings', {}).get('content_type')
    if media is None:
        raise XmasException(code=500, msg='Invalid content type on the picture')
    content = blob_client.download_blob().readall()
    return fastapi.Response(content=content, media_type=media)


@app.post('/api/users/{code:str}/picture',
          summary='Upload the users picture',
          response_model=StatusResponse)
async def post_user_picture(caller: typing.Annotated[User, fastapi.Depends(validate_user)],
                            file: typing.Annotated[fastapi.UploadFile, fastapi.File(description='User picture')]):
    sto_client = blob_container_client()
    cosmos_client = cosmos_container_client()
    if file.content_type not in __content_type_map__.keys():
        raise XmasException(code=400, msg='You must upload a jpeg or png image')
    with sto_client.get_blob_client(blob=caller.id) as blob_client:
        content = file.file.read()
        blob_client.upload_blob(data=content,
                                overwrite=True,
                                content_settings=azure.storage.blob.ContentSettings(content_type=file.content_type))
    caller.hasPicture = True
    cosmos_client.upsert_item(caller.model_dump())
    return StatusResponse(status=200, msg='Picture successfully uploaded')


@app.delete('/api/users/{code:str}/picture',
            summary='Remove the users picture',
            response_model=StatusResponse)
async def remove_user_picture(caller: typing.Annotated[User, fastapi.Depends(validate_user)]):
    sto_client = blob_container_client()
    cosmos_client = cosmos_container_client()
    with sto_client.get_blob_client(blob=caller.id) as blob_blient:
        if blob_blient.exists():
            blob_blient.delete_blob(delete_snapshots='include')
    caller.hasPicture = False
    cosmos_client.upsert_item(caller.model_dump())
    return StatusResponse(status=200, msg='Picture successfully removed')


@app.delete('/api/users/{code:str}', summary='Remove a user')
async def remove_user(caller: typing.Annotated[fastapi_azure_auth.user.User, fastapi.Depends(validate_admin)]):
    cosmos_client = cosmos_container_client()
    cosmos_client.delete_item(item=caller.id, partition_key=caller.id)


@app.get('/api/healthz', summary='Return health information', response_model=HealthzResponse)
async def healthz():
    return HealthzResponse(status='OK', version=__version__)


class SPAStaticFilesWithFallback(fastapi.staticfiles.StaticFiles):
    """
    An override for static files to fall back to the index if the relative path has not been found.
    This permits us to serve an SPA from a single webapp.
    """

    def __init__(self, directory: os.PathLike, index='index.html'):
        self.index = index
        super().__init__(directory=directory, html=True, check_dir=True)

    def lookup_path(self, path: str) -> typing.Tuple[str, typing.Optional[os.stat_result]]:
        full_path, stat_result = super().lookup_path(path)
        if not stat_result:
            return super().lookup_path(self.index)
        return full_path, stat_result


app.mount(path='/',
          app=SPAStaticFilesWithFallback(directory=pathlib.Path(os.path.dirname(__file__), 'static')),
          name='static')
