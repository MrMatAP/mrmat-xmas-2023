import { ApplicationInsights } from '@microsoft/applicationinsights-web'

export const appInsights = new ApplicationInsights({ config: {
        connectionString: 'InstrumentationKey=610196b3-7bef-4d9d-b550-6675545c9e74;IngestionEndpoint=https://northeurope-2.in.applicationinsights.azure.com/;LiveEndpoint=https://northeurope.livediagnostics.monitor.azure.com/'
    }
})
appInsights.loadAppInsights()
appInsights.trackPageView()
