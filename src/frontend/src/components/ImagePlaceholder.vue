<script setup lang="ts">
import { onMounted, computed, ref, } from 'vue'

const props = defineProps<{
  imageUrl: string
  hasImage: boolean
}>()

const loading = ref(true)
const userPicture = ref()
const canUploadNewImage = computed(() => {
  return !props.hasImage
})

onMounted( () => {
  if(props.hasImage) {
    loading.value = true
    userPicture.value.onload = () => { loading.value = false }
  } else {
    loading.value = false
  }
})

</script>

<template>
  <div class="imageplaceholder">
    <img v-show="!loading" :src="imageUrl" alt="Your Image" ref="userPicture" @click.prevent="$emit('selectPicture')"/>
    <p v-show="canUploadNewImage" @click.prevent="$emit('selectPicture')">Tap to add your picture</p>
    <div v-show="loading" class="overlay">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.imageplaceholder {
  width: 80%;
  max-width: 80%;
  min-height: 400px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--xmas-dark-green);
  cursor: pointer;
}

.imageplaceholder img {
  width: 80%;
  max-width: 80%;
}

.imageplaceholder p {
  padding: 10px;
  margin: auto auto;
  text-align: center;
  width: 100%;
  height: 100%;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: white;
}

.loader {
  border: 16px solid var(--xmas-silver);
  border-top: 16px solid var(--xmas-red);
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