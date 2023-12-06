<template>
  <Suspense>
    <router-view />

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
</script>
