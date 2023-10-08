<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { store } from '@/store.js'
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
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <div>
              <AppHeader/>
              <component :is="Component"></component>
            </div>

            <!-- Loading State -->
            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<style scoped>
</style>
