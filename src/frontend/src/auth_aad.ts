import {
    LogLevel,
    PublicClientApplication,
    Configuration,
    IPublicClientApplication
} from "@azure/msal-browser";
import { store } from './store.ts'

class AADAuthentication {

    static loginRequest = {
        scopes: ['user.read', 'api://xmas-backend/admin']
    }
    static msalConfig: Configuration = {
        auth: {
            clientId: 'f150c544-4deb-41cf-9a1f-ced4bbe033cb',
            authority: 'https://login.microsoftonline.com/ef264a25-9f01-42b2-aed1-8e49d358c7e0'
        },
        system: {
            loggerOptions: {
                loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                    if (containsPii) {
                        return;
                    }
                    switch (level) {
                        case LogLevel.Error:
                            console.error(message);
                            return;
                        case LogLevel.Info:
                            console.info(message);
                            return;
                        case LogLevel.Verbose:
                            console.debug(message);
                            return;
                        case LogLevel.Warning:
                            console.warn(message);
                            return;
                        default:
                            return;
                    }
                },
                logLevel: LogLevel.Verbose
            }
        }
    }

    auth: IPublicClientApplication

    private constructor(auth: IPublicClientApplication) {
        this.auth = auth
    }

    static async initialize(): Promise<AADAuthentication> {
        const auth = await PublicClientApplication.createPublicClientApplication(AADAuthentication.msalConfig)
        return new AADAuthentication(auth)
    }

    async authenticate(): Promise<boolean> {
        if(this.auth.getActiveAccount()) return true
        await this.auth.loginRedirect(AADAuthentication.loginRequest).then( () => {
            let activeAccount = this.auth.getActiveAccount()
            if(!activeAccount) return false
            store.isAADAuthenticated = true
            return true
        }).catch( (err) => {
            console.log('An error occurred during loginRedirect: ' + err)
        })
        return false
    }

    async handleRedirect(): Promise<boolean> {
        this.auth.handleRedirectPromise().then( () => {
            const accounts = this.auth.getAllAccounts()
            if(accounts.length > 0) {
                this.auth.setActiveAccount(accounts[0])
                store.identity.name = accounts[0].name as string
                return true
            }
        }).catch( (err) => {
            console.log('An error occured during handleRedirectPromise: ' + err)
        })
        return false
    }
}

export const auth_aad = await AADAuthentication.initialize()
