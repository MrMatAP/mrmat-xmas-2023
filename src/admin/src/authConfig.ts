import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: 'de4c8b9f-89f0-446a-bae9-1979af133d54',
        authority: 'https://login.microsoftonline.com/ef264a25-9f01-42b2-aed1-8e49d358c7e0'
    }
}

export const loginRequest = {
    scopes: ['User.Read']
}

export const cosmosRequest = {
  scopes: ['https://cosmos.azure.com/user_impersonation']
}

export const blobRequest = {
  scopes: ['https://storage.azure.com/user_impersonation']
}

export const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig)
