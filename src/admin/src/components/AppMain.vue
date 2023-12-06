<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <PersonCard v-for="item in items"
                  :name="item.name"
                  :uuid="item.id"
                  :user-picture="item.userPicture"
                  :user-message="item.userMessage"/>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useMsal } from "@/components/useMsal";
import { useCosmos } from '@/components/useCosmos'
import { useSto } from '@/components/useSto'
import { Person } from "../../person";
import PersonCard from "@/components/PersonCard.vue";

const { instance } = useMsal()
let cosmosClient = await useCosmos()
let stoClient = await useSto()
let items = reactive([] as Person[])

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

onMounted( () => {
    cosmosClient.database('mrmat-cosmosdb').container('xmas').items.query('SELECT * FROM c').fetchAll().then( async (response) => {
        let containerClient = stoClient.getContainerClient('xmas')
        for(let resource of response.resources) {
            if(resource.hasPicture) {
                let blobClient = containerClient.getBlobClient(resource.id)
                let blobDownloadResponse = await blobClient.getBlockBlobClient().download()
                let blob = await blobDownloadResponse.blobBody
                let dataURL = ''
                if(blob !== undefined) {
                    dataURL = await blobToDataURL(blob)
                }
                items.push(new Person(
                    resource.id,
                    resource.name,
                    resource.greeting,
                    resource.language,
                    resource.userMessage,
                    resource.hasPicture,
                    dataURL
                ))
            }
        }
    })
})

</script>
