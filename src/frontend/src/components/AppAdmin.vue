

<template>
  <article>
    This is the admin page
    <ul>
      <p>Name: {{ store.identity.name }}</p>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { auth_aad } from '../auth_aad.ts'
import { store } from '../store.ts'

onMounted(() => {
  fetch('/api/users', { headers: { 'Authentication': 'Bearer ' + auth_aad.auth.getActiveAccount().idToken }})
      .then(r => {
        if(r.status === 404) throw Error('resourceNotFound')
        return r.json()
      })
      .then(d => {
        store.admin.identities = d
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

<style scoped>
article {
  order: 2;
  text-align: left;
}
</style>