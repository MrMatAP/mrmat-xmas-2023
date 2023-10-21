<script setup lang="ts">
import { store } from '../store.ts'
</script>

<template>
  <article>
    This is the admin page
    <ul>
      <p>Name: {{ store.identity.name }}</p>
    </ul>
  </article>
</template>

<style scoped>
article {
  order: 2;
  text-align: left;
}
</style>