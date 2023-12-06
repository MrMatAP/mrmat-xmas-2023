<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { msalInstance, loginRequest } from "@/authConfig";

onMounted(() => {
  try {
    msalInstance.loginRedirect(loginRequest).then( (response) => {
      console.log
    })
  } catch (err) {
    console.log(err)
  }
})
</script>
