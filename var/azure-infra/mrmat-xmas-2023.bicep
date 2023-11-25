@description('AppService Plan name')
@minLength(2)
param appServicePlanName string = 'mrmat-xmas-plan'

@description('AppService Plan SKU')
param sku string = 'B1'

@description('Frontend webapp name')
@minLength(2)
param frontendWebappName string = 'mrmat-xmas'

@description('Frontend webapp stack')
param frontendWebappStack string = 'PYTHON|3.11'

@description('Admin webapp name')
@minLength(2)
param adminWebappName string = 'mrmat-xmas-admin'

@description('Admin webapp stack')
param adminWebappStack string = 'NODE|20-lts'

@description('Application Insights name')
param appInsightsName string = 'mrmat-xmas-ai'

@description('Log Analytics workspace resourceid')
param laWorkspaceResourceId string = '/subscriptions/b7a79108-2cda-4a35-8e21-0ede7eefdbae/resourceGroups/infra/providers/Microsoft.OperationalInsights/workspaces/mrmat-log-analytics'

@description('Location for all resources.')
param location string = resourceGroup().location


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

resource frontendWebapp 'Microsoft.Web/sites@2022-09-01' = {
  name: frontendWebappName
  location: location
  kind: 'app'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: frontendWebappStack
      ftpsState: 'FtpsOnly'
      healthCheckPath: '/api/healthz'
      apiDefinition: {
        url: '/openapi.json'
      }
      appCommandLine: 'scripts/startup.sh'
      appSettings: [
        {
          name: 'POST_BUILD_SCRIPT_PATH'
          value: 'scripts/azure-postbuild.sh'
        }
        {
          name: 'PRE_BUILD_SCRIPT_PATH'
          value: 'scripts/azure-prebuild.sh'
        }
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: '1'
        }
        {
          name: 'WEBSITE_HEALTHCHECK_MAXPINGFAILURES'
          value: '10'
        }
      ]
    }
    httpsOnly: true

    clientCertEnabled: false
  }
  identity: {
    type: 'SystemAssigned'
  }
}

resource adminWebapp 'Microsoft.Web/sites@2022-09-01' = {
  name: adminWebappName
  location: location
  kind: 'app'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: adminWebappStack
      ftpsState: 'FtpsOnly'
      appCommandLine: 'scripts/startup.sh'
      appSettings: [
        {
          name: 'POST_BUILD_SCRIPT_PATH'
          value: 'scripts/azure-postbuild.sh'
        }
        {
          name: 'PRE_BUILD_SCRIPT_PATH'
          value: 'scripts/azure-prebuild.sh'
        }
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: '1'
        }
        {
          name: 'WEBSITE_HEALTHCHECK_MAXPINGFAILURES'
          value: '10'
        }
      ]
    }
    httpsOnly: true

    clientCertEnabled: false
  }
  identity: {
    type: 'SystemAssigned'
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: 90
    WorkspaceResourceId: laWorkspaceResourceId
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}
