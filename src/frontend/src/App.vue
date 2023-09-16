<script setup>
import { store } from './store.js'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <div class="overlay" v-show="store.error">
      <p>{{ $t("message.error") }}</p>
    </div>
    <div>
      <HelloWorld msg="MrMat :: Xmas 2023" />
      <p>Version: {{ store.version }}</p>
      <p>I18n Test: {{ $t("message.error") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  async mounted() {
    store.version = await fetch('/api/version')
        .then(r => {
          if(r.status === 404) throw Error('stranger')
          return r.json()
        })
        .then(d => {
          return d.version
        })
        .catch( () => {
          store.error = true
          return 'Unknown'
        })
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 450px;
  margin: 0 auto;
  z-index: 1;
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  color: rgba(130, 130, 130, 0.5);
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  filter: blur(5px);
  margin: 0 auto;
}
.overlay * {
  filter: none;
  z-index: 101;
}
</style>
