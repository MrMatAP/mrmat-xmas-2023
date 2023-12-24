# MrMat :: Xmas 2023

Sources for Mat’s Christmas card for 2023

## How to build this

GitHub Actions will build the solution and, if merging into main will also deploy it into Azure WebApps. Bicep to
establish that is located in `var/azure-infra`. The Bicep is currently not applied by the GitHub Actions build and 
it also does not include the environment variables required for the solution to run. These will have to be configured
manually. See the section on configuration below.

The solution consists of a frontend (Vue + TS) as well as a backend (Python). The frontend is build first and integrated
to be served by the backend as static files. An administrative frontend with full AAD-integrated auth/z/n is in
`src/admin' (honestly, don't look at it, it's horrific)

Versioning of both the front- and backend is performed by GitHub Actions as MAJOR.MINOR.MICRO. The MICRO version is
increased every time the pipeline runs. MAJOR and MINOR are manually adjusted for larger functionality changes. The 
calculated version is relayed into your backend runtime via the `src/ci` Python module and to the frontend at runtime
as part of a generally relayed `X-Version` header. The `src/ci` module is explicitly excluded from being packaged, it 
is a build-time only module.

### How to build this locally

Build and package the frontend first. This will update the static files in `src/mrmat_xmas_2023/static`.

```shell
$ cd src/frontend
$ npm install
$ npm run package
```

Next build the back-end, back from the root of the repository. This will package up both the frontend and backend into
a whill located within `dist/mrmat_xmas_2023-0.0.0.dev0-py3-none-any.whl`. Note that the version is very deliberately 
'0.0.0dev0' so you can always recognise a local build.

```shell
$ pip install -r dev-requirements.txt
$ python -m build -n --wheel
```

### How to run this locally

To run the combined frontend and backend app, watching for changes and having everything served at http://127.0.0.1:8000/, 
run the following.

```shell
$ python -m uvicorn mrmat_xmas_2023:app --reload
```

But this will serve the static production build of the frontend. If you wish to interactively edit the frontend then
start the backend first, but separately start the frontend on http://localhost:5732/ as follows. The frontend when 
started in dev mode will proxy back to the backend at localhost port 8000, which is why you must start the backend first.

```shell
$ cd src/frontend
$ npm run dev
```

Note that the backend exposes OpenAPI UI at http://127.0.0.1/docs/ and OpenAPI Spec at http://127.0.0.1/openapi.json.
The OpenAPI UI is functional and you can authorise with your testclient_client_id/_secret to impersonate a user.

## How to configure this

The backend can be configured using a config file or environment variables. An existing config file will override
anything set in environment variables, counter to the usual logic I would otherwise apply. The location of the
configuration file must currently be at `~/etc/mrmat-xmas-2023.yml`. A YAML config file at that location is meant to be used when building
and testing locally only. The app is meant to be configured using environment varibles when running in Azure WebApps.

| Config                      | Environment Variable        | Description                                                            |
|-----------------------------|-----------------------------|------------------------------------------------------------------------|
| tenant_id                   | AZURE_TENANT_ID             | The Azure Tenant Id                                                    |
| backend_client_id           | AZURE_CLIENT_ID             | ClientId of the backend app. NOT CURRENTLY USED                        |
| backend_client_secret       | AZURE_CLIENT_SECRET         | Secret of the backend_client_id. NOT CURRENTLY USED                    |
| openapi_client_id           | OPENAPI_CLIENT_ID           | ClientId of the OpenAPI UI                                             |
| testclient_client_id        | TESTCLIENT_CLIENT_ID        | ClientId to act as a user (used only by the testsuite)                 |
| testclient_client_secret    | TESTCLIENT_CLIENT_SECRET    | Secret for testclient_client_id                                        |
| cosmos_endpoint             | COSMOS_ENDPOINT             | Endpoint of the CosmosDB holding our user profiles                     |
| cosmos_key                  | COSMOS_KEY                  | Secret key for the cosmos_endpoint                                     |
| cosmos_db                   | COSMOS_DB                   | CosmosDB db name                                                       |
| cosmos_container            | COSMOS_CONTAINER            | CosmosDB container name                                                |
| container_endpoint          | CONTAINER_ENDPOINT          | Name of the storage account for holding user pictures as blobs         |
| container_name              | CONTAINER_NAME              | Name of the container within the storage account to hold user pictures |
| container_directory         | CONTAINER_DIRECTORY         | Subdirectory within the container to hold user pictures                |
| telemetry_connection_string | TELEMETRY_CONNECTION_STRING | AppInsights connection string for the backend                          |

## How to hack on this

### Telemetry

Azure Application Insights telemetry is relatively easy to configure for the frontend but the backend telemetry doesn't
appear to work quite yet. Microsofts venture from its own libraries to adopt OpenTelemetry seem to be quite immature
at the time I'm writing this.

## Azure Webapps Notes

Microsoft appears to be very opinionated on how Python apps are meant to be deployed into Azure Webapps. This affects
the structure on how code is meant to be organised and that your app is built (potentially tested) again at the time
of deployment. Since I work in a quite regulated environment, I professionally disagree with that. I want my standard
source layout, deploy a built and tested artefact and not have that rebuild. I can accept that dependencies are pulled
in at startup time.

Having my opinions clash with Microsoft's means I have to tweak their system as follows:

* We build and test our application using GitHub actions, resulting in a Python wheel within the dist directory
* We add `var/azure-webapp/requirements.txt` to the dist directory at build time.  
  This is an empty file but helps Azure to recognize that this is a Python app.
* We add `var/azure-webapp/azure-prebuild.sh` to the dist directory at build time.  
  This is a shell script that does nothing but may be used to tweak the build process when [Oryx](https://github.com/microsoft/Oryx) constructs the container for the Azure Webapp.
* We add `var/azure-webapp/azure-postbuild.sh` to the dist directory at build time.  
  This is a shell script that installs the wheel we produced and all its dependencies.
* We add `var/azure-webapp/startup.sh` to the dist directory at build time.  
  This is a shell script that executes uvicorn rather than their standard gunicorn.

We then take a zip of the `dist` directory (without the directory itself) and deploy that to Azure.

## Authentication

If you select to authenticate in the webapp UI then the platform deals with auth itself and you must not do it natively
using msal, but pick up the auth info from a env variable instead. If you still try to do both then strange things will
happen, notably that there will be a complaint about the redirect URI.

## Create the AAD/Entra entities

The bicep in `var/azure-infra` currently just creates the Azure WebApps, it does not currently create the service
principals and app registrations. I'll want that to change for next year but here we go:

### App-Registration: xmas-backend  

Create this app registration as a confidential app with the following redirect URIs:

* http://localhost:5173/api/auth-response
* http://localhost:8000/api/auth-response
* https://mrmat-xmas.azurewebsites.net/api/auth-response

> The backend doesn't actually do authenticate users via AAD at this time.

Expose the following scopes:

* api://xmas-backend/admin
* api://xmas-backend/user_impersonation

Authorise the following client applications (once they are defined):

* xmas-frontend
* xmas-backend

Expose the following App Roles:

* Test.Admin

### App-Registration: xmas-frontend

Create this app registration as a public app with the following redirect URIs:

* http://localhost:8000

### App-Registration: xmas-openapi

Create this app registration as a public app with the following redirect URIs:

* http://localhost:8000/oauth2-redirect

### App-Registration: xmas-testclient

Create this app registration as a confidential app and grant the following API permissions:

* xmas-backend: 'Test.Admin' (Application)
* xmas-backend: 'user_impersonation' (Delegated)

### App-Registration: xmas-admin

Create this app registration and add delegated 'user_impersonaation' apis for storage account and cosmos

