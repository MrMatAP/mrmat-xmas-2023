<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMsal } from '@/composables/useMsal.ts'
import { BlobServiceClient } from "@azure/storage-blob"
import { blobRequest } from "@/authConfig.ts";
import { AzureIdentityCredential } from "@/models/AzureIdentityCredential.ts"
import { InteractionRequiredAuthError } from "@azure/msal-browser"

const props = defineProps(['id', 'name', 'greeting', 'language', 'userMessage', 'hasPicture' ])
const { msalInstance } = useMsal()
const loading = ref(true)
const pictureDataUrl = ref('')

async function getBlobServiceClient(): Promise<BlobServiceClient | void> {
  return msalInstance.acquireTokenSilent(blobRequest)
    .then( (token) => {
      return new BlobServiceClient(
        'https://stomrmatinfra.blob.core.windows.net',
        new AzureIdentityCredential(token.accessToken, token.expiresOn)
      )
    })
    .catch( (err) => {
      if(err instanceof InteractionRequiredAuthError) msalInstance.acquireTokenRedirect(blobRequest)
    })
}

async function blobToDataURL(blob: Blob): Promise<string> {
  const fileReader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(blob);
  });
}

onMounted(  () => {
  if(! props.hasPicture) {
    loading.value = false
    return
  }
  getBlobServiceClient().then( async (blobServiceClient) => {
    if(blobServiceClient === undefined) { throw new Error('Failed to obtain a blobServiceClient')}
    let blobClient = blobServiceClient.getContainerClient('xmas').getBlobClient(props.id)
    let blobDownloadResponse = await blobClient.getBlockBlobClient().download()
    let blob = await blobDownloadResponse.blobBody
    if(blob !== undefined) {
      pictureDataUrl.value = await blobToDataURL(blob)
    }
  })
  loading.value = false
})
</script>

<template>
  <v-card
    :loading="loading"
    variant="outlined">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate></v-progress-linear>
    </template>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5" style="text-align: left;">{{ props.name }}</v-card-title>
        <v-card-subtitle style="text-align: left;">{{ props.id }}</v-card-subtitle>
        <v-card-text class="py-0" style="text-align: justify;">
          <v-table>
            <tbody>
              <tr><td>Greeting</td><td>{{ props.greeting }}</td></tr>
              <tr><td>Language</td><td>{{ props.language }}</td></tr>
              <tr><td>Message</td><td>{{ props.userMessage }}</td></tr>
            </tbody>
          </v-table>
        </v-card-text>
      </div>
      <v-avatar class="ma-3" size="125" rounded="0">
        <v-img
          :src="pictureDataUrl"
          aspect-ratio="16/9"
          height="400px">
        </v-img>
      </v-avatar>
    </div>
  </v-card>

</template>

<style scoped>
div.v-card {
  margin-top: 10px;
}
</style>
