# MrMat :: Xmas 2023

Mat's Christmas card for 2023

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

## Technical Notes

### Serving front- and backend from a single app

The 'spa-singleserve' tag shows how to serve the SPA straight from the backend app. There are a number of difficulties
with that:

* If the SPA uses HTML5 history mode for its router, then a fallback route must be defined in the backend that must serve the SPA when no static files or API is found for an given URI.
* There are some issues when part of your application is using our very own 'code authentication' crutch and some parts do proper AAD. Redirects need to be carefully handled so they don't pass to the backend (see issue above) and we never solved configuration of the MSAL library to redirect its code properly.
* Reverting to loginPopup rather than redirects didn't solve the proplem
