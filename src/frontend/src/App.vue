<script setup>
import { onMounted } from 'vue'
import { store } from '@/store.js'
import AppBlurredOverlay from "@/components/AppBlurredOverlay.vue";
import AppLoading from '@/components/AppLoading.vue'
import AppError from '@/components/AppError.vue'
import AppHeader from "@/components/AppHeader.vue";

onMounted(() => {
  fetch('/api/appState')
      .then(r => {
        if(r.status === 404) throw Error('serverNotFound')
        return r.json()
      })
      .then(d => {
        store.appState.version = d.version
        store.appState.isLoading = false
      })
      .catch( (e) => {
        console.log('Got an exception ' + e.reason)
        store.appState.isError = true
        store.appState.errorMessageId = e.reason
        store.appState.isLoading = false
      })
})

</script>

<template>
  <AppBlurredOverlay>
    <AppLoading/>
    <AppError/>
  </AppBlurredOverlay>
  <AppHeader/>
  <router-view/>
<!--  <div class="main">-->
<!--    <p>Version: {{ store.appState.version }}</p>-->
<!--  </div>-->
</template>

<style scoped>
</style>
