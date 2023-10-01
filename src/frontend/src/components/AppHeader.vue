<script setup>
import { store } from '@/store.js'
</script>

<template>
<header>
  <div class="inner-wrapper">
    <router-link to="/">{{ store.identity.greeting }}, {{ store.identity.name }}</router-link>
    <nav>
      <router-link to="/admin" v-show="store.identity.isAdmin">Admin</router-link>
      <p>{{ store.appState.version }}</p>
    </nav>
  </div>
</header>
</template>

<style scoped>
header {
  max-height: 50px;
  flex: 1 1 auto;
}

.inner-wrapper {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

header nav {
  display: flex;
  align-content: baseline;
  margin-left: auto;
}
header nav > * {
  padding: 10px;
}

header nav > p {
  font-size: 8px;
}
</style>