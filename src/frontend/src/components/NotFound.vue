<script setup lang="ts">
import { store } from '../store.ts'
</script>

<template>
<article>
  I clearly know who you are, {{ store.identity.name }} but you're trying to navigate to a place that doesn't exist.
  Go elsewhere.
</article>
</template>

<style scoped>
article {
  flex: 1 1 auto;
  order: 2;
  text-align: left;
}
</style>