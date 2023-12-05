<script setup lang="ts">
const props = defineProps(['name', 'uuid', 'userPicture', 'userMessage' ])
</script>

<template>
  <v-card
    :title="props.name"
    :subtitle="props.uuid"
    variant="outlined">
    <v-card-text class="py-0">
      <v-img aspect-ratio="16/9" :src="props.userPicture"/>
      <p>{{ props.userMessage }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn>Click me</v-btn>
    </v-card-actions>
  </v-card>

</template>

<style scoped>
div.v-card {
  margin-top: 10px;
}
</style>
