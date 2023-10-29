import {
    LogLevel,
    PublicClientApplication,
    Configuration,
    IPublicClientApplication, RedirectRequest
} from "@azure/msal-browser";

export class AADAuthentication {

    isAuthenticated: boolean = false
    static loginRequest: RedirectRequest = {
        redirectUri: '/aadlogin',
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
}

export const auth_aad = await AADAuthentication.initialize()
