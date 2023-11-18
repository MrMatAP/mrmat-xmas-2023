<script setup lang="ts">
import { RouterView } from 'vue-router'
import { store } from "./store.ts";
import AppLoading from "./components/AppLoading.vue"
import AppError from './components/AppError.vue'

</script>

<template>
  <header>
    <div class="inner-wrapper">
      <h1><router-link to="/">{{ store.identity.greeting }}, {{ store.identity.name }}</router-link></h1>
      <nav>
        <p>{{ store.version }}</p>
      </nav>
    </div>
  </header>
  <RouterView></RouterView>
  <AppLoading></AppLoading>
  <AppError></AppError>
</template>

<style scoped>
header {
  min-height: 1.5em;
  padding-bottom: 1em;
  overflow: clip;
}

.inner-wrapper {
  align-items: center;
}

header nav {
  align-content: baseline;
  margin-left: auto;
}

header * h1 {
  font-size: 4vw;
  color: var(--xmas-green);
  margin: 0 0 0 0;
}

header * p {
  font-size: 0.5em;
  color: var(--xmas-green);
}

header * a {
  color: var(--xmas-red);
}
header * a:hover {
  color: var(--xmas-red);
  text-decoration: none;
}
header * a:visited {
  color: var(--xmas-red);
}
</style>
