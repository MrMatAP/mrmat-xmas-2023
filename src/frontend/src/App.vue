<script setup lang="ts">
import { RouterView } from 'vue-router'
import { store } from "./store.ts";
import AppLoading from "./components/AppLoading.vue"
import AppError from './components/AppError.vue'

</script>

<template>
  <header>
    <div class="inner-wrapper">
      <h2><router-link to="/">{{ store.identity.greeting }}, {{ store.identity.name }}</router-link></h2>
      <nav>
        <router-link to="/making-of" v-if="store.identity.id !== '-1'">Making Of</router-link>
        <p>{{ store.version }}</p>
      </nav>
    </div>
  </header>
  <RouterView></RouterView>
  <AppLoading></AppLoading>
  <AppError></AppError>
</template>

<style scoped>
</style>
