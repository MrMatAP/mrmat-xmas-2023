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

## Things to be improved

### Telementry

Azure Application Insights telemetry is relatively easy to configure for the frontend but the backend telemetry doesn't
appear to work quite yet.
