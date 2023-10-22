<script setup lang="ts">
import { ref, computed } from "vue";
import { store } from '../store.ts'

const pictureURL = computed( () => {
  if(store.identity.hasPicture) return this.store.pictureURL
  return '/tap-to-update.png'
})

const fileSelector = ref(null)

function onUploadFile(e) {
  console.log('Uploading file')
  const localImage = fileSelector.value.files[0]
}

function onUpdatePicture(e) {
  e.preventDefault()
  console.log('Updating picture')
  if(! store.identity.hasPicture) {
    fileSelector.value.click()
  }
}

function onSelectPicture(e) {
  e.preventDefault()
  console.log('Selecting picture')
}

function onRemovePicture(e) {
  console.log('Removing picture')
}

function onSend(e) {
  e.preventDefault()
  console.log('Sending message')
}
</script>

<template>
<article>
  <p>
    My analogue engineering challenge for you this year is to build <a href="http://www.origami-instructions.com/origami-modular-toshies-jewel.html">Toshie's Jewel</a>
    from the three <a href="https://en.m.wikipedia.org/wiki/Sonobe">Sonobe</a> units that I'm sending along. You will
    recognise the shape of a Sonobe unit on the bottom left of the picture below, the intermediate unwrapped stage on
    the bottom middle and the completely folded Toshies Jewel on the bottom right. You can use the completed Jewel to
    wrap a holiday present or attach a string to hang it up somewhere.
  </p>
  <div class="centered">
    <a title="Cmglee, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Cmglee_sonobe_models.jpg"><img width="512" alt="Cmglee sonobe models" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cmglee_sonobe_models.jpg/512px-Cmglee_sonobe_models.jpg"></a>
  </div>
  <p>
    Sonobe units are some of the basic building blocks of <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modular Origami</a>.
    You may decide to expand on this challenge by folding additional Sonobe units to construct more elaborate models, as
    shown in the upper half of the picture. The numbers next to the model correspond to the number of Sonobe units you
    need for the model. Sonobe units are not difficult and quick to fold, but consider recruiting your friends and
    family to fold them for you ;o)
  </p>
  <div class="centered">
    <a title="Cmglee, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Sonobe_folding_assembly.svg"><img width="256" alt="Sonobe folding assembly" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sonobe_folding_assembly.svg/256px-Sonobe_folding_assembly.svg.png"></a>
  </div>
  <p>
    Whatever you do, take a picture of yourself and the result and upload it here (it will only be shared with me alone).
  </p>
  <form id="message">
    <h2>Send me a message</h2>
    <div class="centered">
      <img :src="pictureURL" alt="Your picture" @click.prevent="onUpdatePicture">
    </div>
    <p style="white-space: pre-line;">{{ store.userMessage }}</p>
    <textarea v-bind="store.userMessage" placeholder="Your message"></textarea>
    <a href="#" @click.prevent="onSelectPicture" v-show="! store.hasPicture">Upload an image</a>
    <a href="#" @click.prevent="onRemovePicture" v-show="store.hasPicture">Remove the image</a>

    <input ref="fileSelector" type="file" @change.prevent="onUploadFile" style="display: none"/>
    <input type="submit" value="Send" @click.prevent="onSend"/>
  </form>
</article>
</template>

<style scoped>
article {
  flex: 1 1 auto;
  order: 2;
  text-align: left;
}
article img {
  max-width: 50vw;
}
.centered {
  text-align: center;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
}

input[type=submit] {
  background-color: #04AA6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

form img {
  width: 1080px;
  cursor: grab;
}
</style>