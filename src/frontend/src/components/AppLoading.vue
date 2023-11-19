<script setup lang="ts">
import { store } from '../store.js'
</script>

<template>
  <div class="overlay" v-show="store.appState.isLoading">
    <div class="loader" v-show="store.appState.isLoading"></div>
  </div>
</template>

<style scoped>

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  z-index: var(--z-overlay);
  color: rgba(130, 130, 130, 0.5);
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  margin: 0 auto;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 16px solid var(--xmas-red);
  border-top: 16px solid var(--xmas-silver);
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