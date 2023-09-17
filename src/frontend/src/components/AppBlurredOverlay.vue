<script setup>
import { store } from '@/store.js'
</script>

<template>
  <div class="blurry" v-show="store.appState.isError || store.appState.isLoading">
    <slot></slot>
  </div>
</template>

<style scoped>
.blurry {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
</style>