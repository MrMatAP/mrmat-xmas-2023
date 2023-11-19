<script setup lang="ts">
import { onMounted, ref } from "vue"
import { store } from "../store.ts"

import { xmas_backend_client } from "../xmas_backend_client.ts";
import ImagePlaceholder from "./ImagePlaceholder.vue";
import {useI18n} from "vue-i18n";

const { locale } = useI18n({ useScope: 'global' })
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
  locale.value = store.identity.language
})

</script>

<template>
  <article>
    <p v-html="$t('main_my_analogue_engineering')"></p>
    <p>
      <a title="Cmglee, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
         href="https://commons.wikimedia.org/wiki/File:Cmglee_sonobe_models.jpg">
        <img
             alt="Cmglee sonobe models"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cmglee_sonobe_models.jpg/512px-Cmglee_sonobe_models.jpg">
      </a>
    </p>
    <p v-html="$t('main_sonobe_units_are')"></p>
    <p>
      <a title="Cmglee, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Sonobe_folding_assembly.svg"><img width="256" alt="Sonobe folding assembly" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sonobe_folding_assembly.svg/256px-Sonobe_folding_assembly.svg.png"></a>
    </p>
    <h2>{{ $t('feedback_send_me')}}</h2>
    <p>{{ $t('feedback_whatever_you_do')}}</p>
    <div class="form">
      <ImagePlaceholder
          :image-url="userPicture"
          :has-image="store.identity.hasPicture"
          @select-picture="onSelectPicture"></ImagePlaceholder>
        <div class="message">
          <textarea v-model="store.identity.userMessage" placeholder="Your message"></textarea>
        </div>
        <div class="operations">
          <input ref="fileSelector" type="file" @change.prevent="onPictureSelected" style="display: none"/>
          <button @click.prevent="onSend">{{ $t('feedback_send_button')}}</button>
        </div>
    </div>

    <hr/>

    <h2>Making Of</h2>
    <p>{{ $t('making_of_header')}}</p>

    <h3>{{ $t('making_of_card_title') }}</h3>
    <p v-html="$t('making_of_card')"></p>

    <h3>{{ $t('making_of_sonobe_title')}}</h3>
    <p v-html="$t('making_of_sonobe_1')"></p>
    <img src="/lego.png" alt="Mat's Lego Model">

    <p v-html="$t('making_of_sonobe_2')"></p>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2042.7824984429144!2d10.951171428044727!3d59.20293412455325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46440330a960996f%3A0xadcf7eac53734423!2sGamlebyen%2C%201632%20Fredrikstad%2C%20Norway!5e0!3m2!1sen!2sch!4v1700385926829!5m2!1sen!2sch" width="600" height="450" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <p>{{ $t('making_of_sonobe_3') }}</p>
    <p v-html="$t('making_of_sonobe_4')"></p>

    <h3>Near-Field Communication (NFC) Tags</h3>
    <p>{{ $t('making_of_nfc_1')}}</p>
    <p v-html="$t('making_of_nfc_2')"></p>
    <p>{{ $t('making_of_nfc_3')}}</p>
    <p v-html="$t('making_of_nfc_4')"></p>

    <h3>{{$t('making_of_frontend_title')}}</h3>
    <p>{{ $t('making_of_frontend_1')}}</p>
    <p v-html="$t('making_of_frontend_2')"></p>
    <p>{{ $t('making_of_frontend_3')}}</p>
    <p>{{ $t('making_of_frontend_4')}}</p>
    <p>{{ $t('making_of_frontend_5') }} <label class="snow">Snow</label> <label class="green">Green</label> <label class="silver">Silver</label> <label class="red">Red</label>.</p>

    <h3>{{ $t('making_of_backend_title') }}</h3>
    <p v-html="$t('making_of_backend_1')"></p>
    <p v-html="$t('making_of_backend_2')"></p>
    <p v-html="$t('making_of_backend_3')"></p>
    <p>{{ $t('making_of_backend_4') }}</p>
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
  border: 1px solid var(--xmas-silver);
  border-radius: 4px;
  line-height: calc(1ex / 0.32);
  padding: 0.2em 1em 0.2em 1em;
}

label.snow {
  background-color: var(--xmas-snow);
  color: var(--xmas-silver);
}

label.green {
  background-color: var(--xmas-green);
  color: var(--xmas-silver);
}

label.silver {
  background-color: var(--xmas-silver);
  color: black;
}

label.red {
  background-color: var(--xmas-red);
  color: var(--xmas-silver);
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