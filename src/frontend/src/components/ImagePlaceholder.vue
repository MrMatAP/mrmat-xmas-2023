<script setup lang="ts">
import { onMounted, ref, } from 'vue'

const props = defineProps<{
  imageUrl: string
  hasImage: boolean
}>()

const loading = ref(true)
const userPicture = ref()

onMounted( () => {
  loading.value = true
  userPicture.value.onload = () => { loading.value = false }
  if(! props.hasImage) {
    userPicture.value.src = '/tap-to-update.png'
  }
})

</script>

<template>
  <div class="imageplaceholder">
    <img v-show="!loading" :src="imageUrl" alt="Your Image" ref="userPicture" @click.prevent="$emit('selectPicture')"/>
    <div v-show="loading" class="overlay">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.imageplaceholder {
  min-height: 390px;
  cursor: pointer;
}

.imageplaceholder p {
  padding: 10px;
  margin: auto auto;
  text-align: center;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: white;
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