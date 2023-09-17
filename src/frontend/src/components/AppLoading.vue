<script setup>
import { store } from '@/store.js'
</script>

<template>
  <div class="loader" v-show="store.appState.isLoading">
  </div>
</template>

<style scoped>
.loader {
  border: 16px solid var(--xmas-silver);
  border-top: 16px solid var(--xmas-red);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  z-index: var(--z-loading);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>