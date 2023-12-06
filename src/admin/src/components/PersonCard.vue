<script setup lang="ts">
const props = defineProps(['name', 'uuid', 'userPicture', 'userMessage' ])
</script>

<template>
  <v-card
    :title="props.name"
    :subtitle="props.uuid"
    variant="outlined">
      <v-img
          :src="userPicture"
          aspect-ratio="16/9"
          height="400px"></v-img>
    <v-card-text class="py-0">
      <p>{{ props.userMessage }}</p>
    </v-card-text>
  </v-card>

</template>

<style scoped>
div.v-card {
  margin-top: 10px;
}
</style>
