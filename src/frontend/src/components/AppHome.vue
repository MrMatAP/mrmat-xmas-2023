<script setup lang="ts">
import { onMounted, ref } from "vue"
import { store } from "../store.ts"

import { xmas_backend_client } from "../xmas_backend_client.ts";
import ImagePlaceholder from "./ImagePlaceholder.vue";
import { useI18n, I18nT } from "vue-i18n";

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
    <I18nT keypath="main_challenge_1" tag="p">
      <a href="https://en.m.wikipedia.org/wiki/Sonobe">{{ $t('sonobe_units' )}}</a>
      <a href="http://www.origami-instructions.com/origami-modular-toshies-jewel.html">{{ $t('toshies_jewel') }}</a>
      <a href="https://youtu.be/lRHxrKjiqYE?si=30ioVpGeTMPn3-Dq">YouTube</a>
    </I18nT>
    <p>
      <a title="Cmglee, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
         href="https://commons.wikimedia.org/wiki/File:Cmglee_sonobe_models.jpg">
        <img
             alt="Cmglee sonobe models"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cmglee_sonobe_models.jpg/512px-Cmglee_sonobe_models.jpg">
      </a>
    </p>
    <I18nT keypath="main_challenge_2" tag="p">
      <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modular Origami</a>
    </I18nT>
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
        <textarea v-model="store.identity.userMessage" :placeholder="$t('feedback_your_message')"></textarea>
        <div class="operations">
          <input ref="fileSelector" type="file" @change.prevent="onPictureSelected" style="display: none"/>
          <button @click.prevent="onSend">{{ $t('feedback_send_button')}}</button>
        </div>
    </div>

    <hr/>

    <h2>Making Of</h2>
    <p>{{ $t('making_of_header_1')}}</p>
    <p>{{ $t('making_of_header_2')}}</p>

    <h3>{{ $t('making_of_card_title') }}</h3>
    <I18nT keypath="making_of_card_1" tag="p">
      <a href="https://www.jetpens.com/Uni-ball-Signo-Noble-Metal-Metallic-UM-120NM-Gel-Pen-8-Color-Bundle/pd/23873">Uni-ball Signo Metal Metallic UM-120NM Gel Pens</a>
      <a href="https://hands-singapore.com.sg/">Tokyu Hands</a>
      <a href="https://youtu.be/PESa3Du3udY?si=XJn_adgbOAzLZOkH">{{ $t('making_of_card_overengineered') }}</a>
    </I18nT>

    <h3>{{ $t('making_of_sonobe_title')}}</h3>
    <I18nT keypath="making_of_sonobe_1" tag="p">
      <a href="https://www.amazon.com/gp/product/B088RF3199?ref_=dbs_m_mng_rwt_calw_tkin_1&storeType=ebooks&qid=1700993834&sr=8-1">Master of the Revels: A Return to Neal Stephensons D.O.D.O</a>
      <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modular Origami</a>
    </I18nT>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2042.7824984429144!2d10.951171428044727!3d59.20293412455325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46440330a960996f%3A0xadcf7eac53734423!2sGamlebyen%2C%201632%20Fredrikstad%2C%20Norway!5e0!3m2!1sen!2sch!4v1700385926829!5m2!1sen!2sch" style="border:0; width: 100%; min-height: 400px;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <p>{{ $t('making_of_sonobe_2') }}</p>
    <I18nT keypath="making_of_sonobe_3" tag="p">
      <a href="https://www.google.com/search?q=modular+origami&sca_esv=583745314&tbm=isch&sxsrf=AM9HkKkXJ_uPM4G2xBeZAYguwEnbV16PsA:1700388232484&source=lnms&sa=X&ved=2ahUKEwjh_s7k58-CAxUXyQIHHTPtCFsQ_AUoAXoECAMQAw&biw=1652&bih=1294&dpr=1">Google</a>
      <a href="https://en.wikipedia.org/wiki/Triakis_icosahedron">Triakis Icosahedron</a>
    </I18nT>

    <h3>{{ $t('making_of_nfc_title')}}</h3>
    <I18nT keypath="making_of_nfc_1" tag="p">
      <a href="https://en.wikipedia.org/wiki/QR_code">QR-Codes</a>
      <a href="https://en.wikipedia.org/wiki/Near-field_communication">NFC Tags</a>
    </I18nT>
    <p>{{ $t('making_of_nfc_2')}}</p>
    <I18nT keypath="making_of_nfc_3" tag="p">
      <a href="https://en.wikipedia.org/wiki/Near-field_communication">Near-Field Communication (NFC)</a>
    </I18nT>
    <p>{{ $t('making_of_nfc_4')}}</p>

    <h3>{{$t('making_of_frontend_title')}}</h3>
    <p>{{ $t('making_of_frontend_1')}}</p>
    <I18nT keypath="making_of_frontend_2" tag="p">
      <a href="https://www.typescriptlang.org/">TypeScript</a>
      <a href="https://vuejs.org/">Vue</a>
    </I18nT>
    <p>{{ $t('making_of_frontend_3')}}</p>
    <p>{{ $t('making_of_frontend_4')}}</p>

    <h3>{{ $t('making_of_backend_title') }}</h3>
    <I18nT keypath="making_of_backend_1" tag="p">
      <a href="https://python.org" target="_blank">Python</a>
      <a href="https://fastapi.tiangolo.com/" target="_blank">FastAPI</a>
      <a href="https://azure.microsoft.com/de-de/products/app-service/web" target="_blank">Azure WebApp</a>
      <a href="https://swagger.io/blog/code-first-vs-design-first-api/#:~:text=A%20code%2Dfirst%20approach%2C%20as,the%20code%20after%20the%20fact." target="_blank">Code-First</a>
      <a href="https://en.wikipedia.org/wiki/REST" target="_blank">REST API-Design</a>
      <a href="https://en.wikipedia.org/wiki/OpenAPI_Specification" target="_blank">OpenAPI</a>
    </I18nT>
    <I18nT keypath="making_of_backend_2" tag="p">
      <a href="https://github.com/MrMatAP/mrmat-xmas-2023" target="_blank">mrmat-xmas-2023</a>
    </I18nT>
    <I18nT keypath="making_of_backend_3" tag="p">
      <a href="https://en.wikipedia.org/wiki/Single-page_application" target="_blank">Single Page Applications (SPA)</a>
    </I18nT>
  </article>
</template>

<style scoped>
.operations button {
  background-color: var(--xmas-green);
  color: var(--xmas-silver);
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 0;
  padding: 12px 20px 12px 20px;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: var(--xmas-silver);
  color: var(--xmas-green);
}
</style>