<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store.js'

const errorMessageId = computed(() => {
  return 'errorMessages.' + store.appState.errorMessageId
})
</script>

<template>
  <div class="overlay" v-show="store.appState.isError">
    <div class="errorMessage">
      <h1>{{ $t('errorHeader') }}</h1>
      <p>{{ $t(errorMessageId) }}</p>
    </div>
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

.errorMessage {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: var(--z-error);
  background-color: white;
  min-width: 80vh;
  border: 1px solid black;
  padding: 10px;
}

.errorMessage h1 {
  font-size: 20pt;
  font-weight: bold;
  color: var(--xmas-red);
  margin-bottom: 0;
}

.errorMessage p {
  font-size: 12pt;
  color: #580404;
  margin-top: 0;
}
</style>