import os
import pathlib
import importlib.metadata
import uuid

import msal
import fastapi
import fastapi.middleware.cors
import fastapi.staticfiles
import fastapi_azure_auth
import fastapi_azure_auth.user
import pydantic
import azure.identity
import azure.cosmos
import azure.cosmos.exceptions


from .config import Config
from .model import User

try:
    __version__ = importlib.metadata.version('mrmat-xmas-2023')
except importlib.metadata.PackageNotFoundError:
    # You have not yet installed this as a package, likely because you're hacking on it in some IDE
    __version__ = '0.0.0.dev0'
__config_file__ = pathlib.Path('~/etc/mrmat-xmas-2023.yml').expanduser()

config = Config(__config_file__)
app_credential = azure.identity.DefaultAzureCredential()
cosmos_client = azure.cosmos.CosmosClient(url=config.cosmos_endpoint, credential=app_credential)
xmas_client = cosmos_client.get_database_client(config.cosmos_db).get_container_client(config.cosmos_container)
# cc_app = msal.ConfidentialClientApplication(
#     authority=config.authority,
#     client_id=config.backend_client_id,
#     client_credential=config.backend_client_secret)
# cc_token = cc_app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])
app = fastapi.FastAPI(
    swagger_ui_oauth2_redirect_url='/oauth2-redirect',
    swagger_ui_init_oauth={
        'usePkceWithAuthorizationCodeGrant': True,
        'clientId': config.openapi_client_id
    }
)
#if config.backend_cors_origins:
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


@app.get('/api/admin/',
         dependencies=[fastapi.Security(azure_scheme, scopes=['admin'])])
async def admin_list():
    results = xmas_client.query_items(
        query="SELECT * FROM xmas x WHERE x.year = @year",
        parameters=[{'name': '@year', 'value': 2023}],
        enable_cross_partition_query=True)
    return list(results)


@app.post('/api/admin',
          dependencies=[fastapi.Security(azure_scheme, scopes=['admin'])])
async def admin_post():
    user = model.User(
        id=str(uuid.uuid4()),
        year=2023,
        name='Test')
    xmas_client.create_item(user.model_dump())
    return {'message': 'Item created'}


@app.get('/api/whoami',
         response_model=fastapi_azure_auth.user.User,
         operation_id='whoami',
         dependencies=[fastapi.Security(azure_scheme)])
async def whoami(request: fastapi.Request) -> dict[str, bool]:
    return request.state.user.dict()




@app.get('/api/auth-response')
async def auth_response():
    pass


@app.get('/api/hello')
async def root():
    return {'message': 'Hello World'}


@app.get('/api/healthz')
async def healthz():
    return {'status': 'OK', 'version': __version__}


@app.get('/api/appState')
async def app_state():
    return {'version': __version__}


@app.get('/api/landing/{user_id}',
         response_model=User)
async def landing(user_id: str) -> User:
    try:
        entry = xmas_client.read_item(item=user_id, partition_key=user_id)
        user = model.User.from_cosmos(entry)
    except azure.cosmos.exceptions.CosmosHttpResponseError:
        user = model.User(id='0', year=2023, name='Stranger')
    return user


app.mount('/',
          fastapi.staticfiles.StaticFiles(directory=os.path.join(os.path.dirname(__file__), 'static'), html=True),
          name='static')
