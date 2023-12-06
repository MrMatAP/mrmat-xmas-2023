import { getCurrentInstance, toRefs } from "vue";
import {CosmosClient} from "@azure/cosmos";
import {InteractionRequiredAuthError} from "@azure/msal-browser";
import {AzureMakesItHardCredential} from "@/authConfig";

export async function useCosmos(): Promise<CosmosClient> {
    const internalInstance = getCurrentInstance();
    if (!internalInstance) {
        throw "useCosmos() cannot be called outside the setup() function of a component";
    }
    const {instance, accounts} = toRefs(internalInstance.appContext.config.globalProperties.$msal);
    if (!instance) {
        throw "Please install the msalPlugin";
    }

    try {
        let response = await instance.value.acquireTokenSilent({
            scopes: ['https://cosmos.azure.com/user_impersonation']
        });
        let creds = new AzureMakesItHardCredential(response.accessToken, response.expiresOn?.getTime())
        return new CosmosClient({
            aadCredentials: creds,
            endpoint: 'https://mrmat-cosmosdb.documents.azure.com:443/'
        })
    } catch (err) {
        console.log(err)
        if (err instanceof InteractionRequiredAuthError) {
            instance.value.acquireTokenRedirect({scopes: ['https://cosmos.azure.com/user_impersonation']})
        }
    }
    throw 'You should not end up here for the cosmos client'
}
