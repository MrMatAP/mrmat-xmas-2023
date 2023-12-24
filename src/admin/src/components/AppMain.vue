<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <PersonCard v-for="item in items"
                  :id="item.id"
                  :name="item.name"
                  :greeting="item.greeting"
                  :language="item.language"
                  :user-message="item.userMessage"
                  :has-picture="item.hasPicture"/>
      <v-overlay contained v-model="loading" class="align-center justify-center">\
        {{ status }}
      </v-overlay>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import { useMsal } from '@/composables/useMsal.ts';
import { cosmosRequest } from '@/authConfig.ts'
import { Person } from "../models/Person.ts";
import PersonCard from "@/components/PersonCard.vue";
import { AzureIdentityCredential } from "@/models/AzureIdentityCredential.ts";
import { CosmosClient } from "@azure/cosmos";
import {InteractionRequiredAuthError} from "@azure/msal-browser";

const { msalInstance } = useMsal()
let items = reactive([] as Person[])
let loading = ref(true)
let status = ref('Loading')



async function getCosmosClient(): Promise<CosmosClient | void> {
  return msalInstance.acquireTokenSilent(cosmosRequest)
    .then( (token) => {
      return new CosmosClient({
        aadCredentials: new AzureIdentityCredential(token.accessToken, token.expiresOn),
        endpoint: 'https://mrmat-cosmosdb.documents.azure.com:443/'
      })
    })
    .catch( (err) => {
      if(err instanceof InteractionRequiredAuthError) msalInstance.acquireTokenRedirect(cosmosRequest)
    })
}

onMounted( async () => {
  getCosmosClient().then( (cosmosClient) => {
    if(cosmosClient === undefined) { throw new Error('Failed to obtain a cosmosClient') }
    status.value = 'Loading people'
    cosmosClient.database('mrmat-cosmosdb').container('xmas').items.query('SELECT * FROM c').fetchAll().then( async (response) => {
      for(let resource of response.resources) {
        items.push(new Person(
            resource.id,
            resource.name,
            resource.greeting,
            resource.language,
            resource.userMessage,
            resource.hasPicture
        ))
      }
      loading.value = false
    })
  })
})

</script>
