<script setup lang="ts">
import { onMounted, ref } from "vue"
import { store } from "../store.ts"

import { xmas_backend_client } from "../xmas_backend_client.ts";
import ImagePlaceholder from "./ImagePlaceholder.vue";

const userPicture = ref('')
const fileSelector = ref()

function onRemovePicture() {
  console.log('Removing picture')
  xmas_backend_client.removeUserPicture()
}

function onSend() {
  console.log('Sending message')
  xmas_backend_client.updateUser()
}

function onSelectPicture() {
  console.log('Selecting new picture')
  fileSelector.value.click()
}

function onPictureSelected() {
  console.log('Picture was selected')
  const localImage = fileSelector.value.files[0]
  xmas_backend_client.postUserPicture(localImage)
      .then( () => {
        console.log('Image uploaded')
        userPicture.value = xmas_backend_client.userPicture(store.identity.id)
      })
}

onMounted( () => {
  if(store.identity.hasPicture) {
    userPicture.value = xmas_backend_client.userPicture(store.identity.id)
  }
})

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
    <h2>Send me a message</h2>
    <p>
      Whatever you do, take a picture of yourself and the result, then upload it here. It will only be shared with me alone.
    </p>
    <div class="feedback">
      <ImagePlaceholder
          :image-url="userPicture"
          :has-image="store.identity.hasPicture"
          @select-picture="onSelectPicture"></ImagePlaceholder>
      <div class="form">
        <div class="message">
          <textarea v-model="store.identity.userMessage" placeholder="Your message"></textarea>
        </div>
        <div class="operations">
          <input ref="fileSelector" type="file" @change.prevent="onPictureSelected" style="display: none"/>
          <input type="button" value="Send" @click.prevent="onSend"/>
          <input type="button" value="Remove picture" @click.prevent="onRemovePicture"/>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  flex: 1 1 auto;
  order: 2;
  text-align: left;
}

.centered {
  text-align: center;
}

.feedback {
  text-align: center;
}

.feedback .picture {
  max-width: 500px;
  max-height: 500px;
}

.feedback .picture img {
  max-width: 100%;
}

.feedback .form {
  display: flex;
  flex-direction: column;
}
.feedback .form .message {
  max-width: 50%;
}
.feedback .form .operations {
  max-width: 50%;
}

label {
  padding: 12px 12px 12px 0;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
}

input[type=button] {
  background-color: #04AA6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.placeholder {
  border: 16px solid var(--xmas-dark-olive);
  border-top: 16px solid var(--xmas-dark-green);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>