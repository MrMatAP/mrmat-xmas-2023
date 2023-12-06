import {PublicClientApplication} from "@azure/msal-browser";
import {AccessToken, GetTokenOptions, TokenCredential} from "@azure/identity";

export const msalConfig = {
  auth: {
    clientId: 'de4c8b9f-89f0-446a-bae9-1979af133d54',
    authority: 'https://login.microsoftonline.com/ef264a25-9f01-42b2-aed1-8e49d358c7e0'
  }
};

export const loginRequest = {
  scopes: ['User.Read']
}

export const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

export class AzureMakesItHardCredential implements TokenCredential {

  token: string
  expiry: number

  constructor(token: string, expiry: number) {
    this.token = token
    this.expiry = expiry
  }

  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    return Promise.resolve({ token: this.token, expiresOnTimestamp: this.expiry});
  }
}
