@description('Base name of the resource such as web app name and app service plan ')
@minLength(2)
param webAppName string = 'mrmat-xmas-2023'

@description('The SKU of App Service Plan ')
param sku string = 'F1'

@description('The Runtime stack of current web app')
param linuxFxVersion string = 'PYTHON|3.11'

@description('Location for all resources.')
param location string = resourceGroup().location

var webAppPortalName = '${webAppName}-webapp'
var appServicePlanName = 'AppServicePlan-${webAppName}'

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: sku
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource webAppPortal 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppPortalName
  location: location
  kind: 'app'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: linuxFxVersion
      ftpsState: 'FtpsOnly'
      healthCheckPath: '/api/healthz'
      apiDefinition: {
        url: '/openapi.json'
      }
      appCommandLine: 'startup.sh'
      appSettings: [
          {
              name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
              value: '1'
          }
          {
              name: 'PRE_BUILD_COMMAND'
              value: 'azure-prebuild.sh'
          }
          {
              name: 'POST_BUILD_COMMAND'
              value: 'azure-postbuild.sh'
          }
      ]
    }
    httpsOnly: true
  }
  identity: {
    type: 'SystemAssigned'
  }
}