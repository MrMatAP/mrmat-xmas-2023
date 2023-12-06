<template>
  <v-app-bar flat>
    <v-app-bar-title>
      MrMat :: Xmas 2023 :: Admin ({{ name }})
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useMsal } from '@/components/useMsal'

const { accounts } = useMsal()
const name = computed( () => {
    if(accounts.value.length > 0) {
        const name = accounts.value[0].name
        if(name) {
            return name.split(" ")[0]
        }
    }
    return ""
})

</script>
