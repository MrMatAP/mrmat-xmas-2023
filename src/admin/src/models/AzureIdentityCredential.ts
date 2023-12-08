import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/identity";

export class AzureIdentityCredential implements TokenCredential {

  token: string
  expiry: number

  constructor(token: string, expiry: Date | null) {
    this.token = token
    if(expiry === null) throw new Error('Unable to create an AzureIdentityCredential with a token that has an undefined expiry time')
    this.expiry = expiry.getTime()
  }

  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    return Promise.resolve({ token: this.token, expiresOnTimestamp: this.expiry});
  }
}
