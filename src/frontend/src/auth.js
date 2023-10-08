import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: 'f150c544-4deb-41cf-9a1f-ced4bbe033cb',
        authority: 'https://login.microsoftonline.com/ef264a25-9f01-42b2-aed1-8e49d358c7e0'
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
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

export const auth = await PublicClientApplication.createPublicClientApplication(msalConfig)

export const loginRequest = {
    scopes: ['user.read', 'api://xmas-backend/admin']
}
