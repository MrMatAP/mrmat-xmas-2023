import os
import importlib.metadata

import fastapi
import fastapi.staticfiles

try:
    __version__ = importlib.metadata.version('mrmat-xmas-2023')
except importlib.metadata.PackageNotFoundError:
    # You have not yet installed this as a package, likely because you're hacking on it in some IDE
    __version__ = '0.0.0.dev0'

app = fastapi.FastAPI()


@app.get('/api/hello')
async def root():
    return {'message': 'Hello World'}


@app.get('/api/healthz')
async def healthz():
    return {'status': 'OK', 'version': __version__}


@app.get('/api/appState')
async def app_state():
    return {'version': __version__}


app.mount('/',
          fastapi.staticfiles.StaticFiles(directory=os.path.join(os.path.dirname(__file__), 'static'), html=True),
          name='static')
