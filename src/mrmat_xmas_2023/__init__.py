import os
import pathlib
import importlib.metadata

import msal
import fastapi
import fastapi.staticfiles

from .config import Config

try:
    __version__ = importlib.metadata.version('mrmat-xmas-2023')
except importlib.metadata.PackageNotFoundError:
    # You have not yet installed this as a package, likely because you're hacking on it in some IDE
    __version__ = '0.0.0.dev0'
__config_file__ = pathlib.Path('~/etc/mrmat-xmas-2023.yml').expanduser()

config = Config(__config_file__)
cc_app = msal.ConfidentialClientApplication(
    authority=config.authority,
    client_id=config.client_id,
    client_credential=config.client_secret)
app = fastapi.FastAPI()


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


@app.get('/api/landing/{code}')
async def landing(code: str):
    response = fastapi.responses.RedirectResponse('/')
    response.set_cookie(key='user', value=code)
    return response


app.mount('/',
          fastapi.staticfiles.StaticFiles(directory=os.path.join(os.path.dirname(__file__), 'static'), html=True),
          name='static')
