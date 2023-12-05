<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { msalInstance, msalConfig } from "@/aad_auth";

onMounted(() => {
  try {
    msalInstance.loginRedirect({});
  } catch (err) {
    // handle error
  }
})
</script>
