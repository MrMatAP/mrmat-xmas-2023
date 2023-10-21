import {
    LogLevel,
    PublicClientApplication,
    Configuration,
    IPublicClientApplication
} from "@azure/msal-browser";

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

    isAuthenticated(): boolean {
        return this.auth.getActiveAccount() !== null
    }

    async handleRedirect(): Promise<boolean> {
        this.auth.handleRedirectPromise().then( () => {
            const accounts = this.auth.getAllAccounts()
            if(accounts.length > 0) {
                this.auth.setActiveAccount(accounts[0])
                return true
            }
        }).catch( (err) => {
            console.log('An error occured during handleRedirectPromise: ' + err)
        })
        return false
    }

    handleAADAuthentication(): boolean {
        return true
    }

    handleMrMatAuthentication(): boolean {
        return true
    }
}

export const auth = await AADAuthentication.initialize()
