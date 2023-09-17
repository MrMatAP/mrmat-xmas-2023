<script setup>
import { computed } from 'vue'
import { store } from '@/store.js'

const errorMessageId = computed(() => {
  return 'errorMessages.' + store.appState.errorMessageId
})
</script>

<template>
  <div class="errorMessage" v-show="store.appState.isError">
    <h1>{{ $t('errorHeader') }}</h1>
    <p>{{ $t(errorMessageId) }}</p>
  </div>
</template>

<style scoped>
.errorMessage {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: var(--z-error);
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