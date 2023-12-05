<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <PersonCard v-for="item in items"
                  :name="item.name"
                  :uuid="item.uuid"
                  :user-picture="item.userPicture"
                  :user-message="item.userMessage"/>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import PersonCard from "@/components/PersonCard.vue";
const items = reactive([
  { name: 'Mathieu', uuid: '0abc', userPicture: 'https://m.media-amazon.com/images/M/MV5BMGUzYTc2YTgtYTI2My00MDcxLThiYmQtYzQ4NmUyY2MwMmZmXkEyXkFqcGdeQXVyNjEwNDU4MTg@._V1_.jpg', userMessage: 'Hi there' },
  { name: 'Urs', uuid: 'efga', userPicture: 'https://static01.nyt.com/images/2020/03/31/arts/31tvcol-01/31tvcol-01-videoSixteenByNineJumbo1600.jpg', userMessage: 'foo' }])
</script>
