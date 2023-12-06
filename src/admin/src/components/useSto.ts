import { getCurrentInstance, toRefs } from "vue";
import {BlobServiceClient} from "@azure/storage-blob";
import {InteractionRequiredAuthError} from "@azure/msal-browser";
import {AzureMakesItHardCredential} from "@/authConfig";

export async function useSto(): Promise<BlobServiceClient> {
    const internalInstance = getCurrentInstance();
    if (!internalInstance) {
        throw "useSto() cannot be called outside the setup() function of a component";
    }
    const {instance, accounts} = toRefs(internalInstance.appContext.config.globalProperties.$msal);
    if (!instance) {
        throw "Please install the msalPlugin";
    }

    try {
        let response = await instance.value.acquireTokenSilent({
            scopes: ['https://storage.azure.com/user_impersonation']
        });
        let creds = new AzureMakesItHardCredential(response.accessToken, response.expiresOn?.getTime())
        return new BlobServiceClient(
            'https://stomrmatinfra.blob.core.windows.net',
            creds)
    } catch (err) {
        console.log(err)
        if (err instanceof InteractionRequiredAuthError) {
            instance.value.acquireTokenRedirect({scopes: ['https://storage.azure.com/user_impersonation']})
        }
    }
    throw 'You should not end up here for the cosmos client'
}
