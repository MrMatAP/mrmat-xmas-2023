<script setup lang="ts">
import { onMounted, ref } from "vue"
import { store } from "../store.ts"

import { xmas_backend_client } from "../xmas_backend_client.ts";
import ImagePlaceholder from "./ImagePlaceholder.vue";

const userPicture = ref('')
const fileSelector = ref()

function onSend() {
  xmas_backend_client.putUserMessage()
}

function onSelectPicture() {
  fileSelector.value.click()
}

function onPictureSelected() {
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
    <p>
      <a title="Cmglee, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
         href="https://commons.wikimedia.org/wiki/File:Cmglee_sonobe_models.jpg">
        <img
             alt="Cmglee sonobe models"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cmglee_sonobe_models.jpg/512px-Cmglee_sonobe_models.jpg">
      </a>
    </p>
    <p>
      Sonobe units are some of the basic building blocks of <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modular Origami</a>.
      You may decide to expand on this challenge by folding additional Sonobe units to construct more elaborate models, as
      shown in the upper half of the picture. The numbers next to the model correspond to the number of Sonobe units you
      need for the model. Sonobe units are not difficult and quick to fold, but consider recruiting your friends and
      family to fold them for you ;o)
    </p>
    <p>
      <a title="Cmglee, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Sonobe_folding_assembly.svg"><img width="256" alt="Sonobe folding assembly" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sonobe_folding_assembly.svg/256px-Sonobe_folding_assembly.svg.png"></a>
    </p>
    <h2>Send me a message</h2>
    <p>
      Whatever you do, take a picture of yourself and the result, then upload it here. It will only be shared with me alone.
    </p>
    <p>
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
          <button @click.prevent="onSend">Send</button>
        </div>
      </div>
    </p>

    <hr/>

    <h2>Making of</h2>
    <p>
      I've started to make Christmas cards for my friends and family back when I was far, far away in Singapore. From the
      beginning, I felt there needed to be something creative and that there ought to be an analogue but also digital
      component to the card. Wherever possible, I wanted the recipients to come together in some way even if I couldn't
      be there.
    </p>

    <h3>Lorem</h3>
    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

    <h4>Lorem</h4>
    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    <h4>Lorem</h4>
    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    <h4>Lorem</h4>
    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

  </article>
</template>

<style scoped>
.form {
  width: 80vb;
}

.operations button {
  background-color: var(--xmas-green);
  color: var(--xmas-silver);
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 0;
  padding: 12px 20px 12px 20px;
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
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
</style>