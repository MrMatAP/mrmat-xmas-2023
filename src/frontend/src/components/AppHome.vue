<script setup lang="ts">
import { onMounted, ref } from "vue"
import { store } from "../store.ts"

import { xmas_backend_client } from "../xmas_backend_client.ts";
import ImagePlaceholder from "./ImagePlaceholder.vue";
import {useI18n} from "vue-i18n";

const { t, locale } = useI18n({ useScope: 'global' })
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
    <p>
      So not only did I not want you to have to type in some URL from the card, I also needed to relay some identity. In
      the past I used to print out <a href="https://en.wikipedia.org/wiki/QR_code">QR-Codes</a> which you get to see
      everywhere these days. This time I went for <a href="https://en.wikipedia.org/wiki/Near-field_communication">NFC tags</a>.
    </p>
    <p>
      The NFC tag you held your phone or tablet against is the most common application for Near-field Communication,
      leading to a customised URL containing a unique code that identifies you. That code is then verified whether I
      actually do know you and that yields your identity. If I don't have you registered you're led to a page wishing
      you a happy holiday as a stranger. This sort of "code authentication" is clearly not enterprise grade, but it'll
      do for my Christmas card just fine and it saves us all from yet another password that, apart from being annoyed,
      no doubt you'd forget next year.
    </p>
    <p>
      There are way more things that you can do with NFC tags than this and I also find them a lot more convenient than
      QR Codes. There are quite a number of competing standards, not the least of which one that you would use when
      checking in to your local public transport (typically <a href="https://en.wikipedia.org/wiki/FeliCa">Felica</a>
      or the one that you would use for contactless payments. You can use them for access tokens, to join your wireless
      and exchange identities and contacts. NFC tags are fairly cheap and I can see some further interesting uses.
      However, it is unfortunate that very quickly you will need to actually write some mobile app to make use of them
      and as we all know the producers of mobile phones tend to be rather restrictive to do that (principally looking
      at you, Apple).
    </p>

    <h3>The front-end</h3>
    <p>
      I really struggle writing frontends and the one you're looking at really was no exception. It's not the asynchronicity
      and event-drivenness of user interfaces, I get all that. But I have a real distaste for the chaos that is JavaScript
      with its myriad of special cases that entirely defy logic for me. Sure, you will tell me that it's just a number of
      things you just have to know but frankly I just can't be bothered.
    </p>
    <p>
      It is for that reason that I chose <a href="https://www.typescriptlang.org/">TypeScript</a> and <a href="https://vuejs.org/">Vue</a>
      this time to just make this a tiny little bit better for myself. TypeScript makes sense to me as someone coming
      from the back-end because it at least reports the most egregious traps I might fall into. Vue makes sense with its
      encapsulation of styles, code and template in its Vue components. I still spent way, way too much on the front-end cursing
      web browsers for their limitations and unpredictability when it comes to placing things where I want them to be
      and making that legible and responsive (you can't make assumptions about what device people look at your site with
      what screen size. I could have used any of the many responsive CSS UI frameworks, but I didn't.
    </p>
    <p>
      It's a lot more complicated than you think to make text legible, regardless of what medium. I have quite a bit of
      experience producing content I need its consumers to understand but the design for that to be legible on a screen
      is a science on its own. This goes way beyond just showing a picture here and there and has a lot to do with the
      classic art of typography. If you look closely at the styles definition of the text here, you will find that its size,
      line-height, number of words and even the text color are dynamically calculated to optimise legibility.
    </p>
    <p>
      Not everyone I send this to is a native English speaker so there is internationalisation based on your identity. It
      was also very important to me that the front-end is aware of its version.
    </p>
    <p>
      The color-scheme is used on this site consists of
      <label class="snow">Snow</label>,
      <label class="green">Green</label>,
      <label class="silver">Silver</label> and
      <label class="red">Red</label>
    </p>

    <h3>The back-end</h3>
    <p>
      The back-end is a fairly simple Python application using <a href="https://fastapi.tiangolo.com/">FastAPI</a>,
      hosted as an Azure WebApp. FastAPI generally makes a lot of sense to me because it follows my preferred code-first
      method of producing APIs and very nicely produces an OpenAPI spec based on the decorators it provides. The Python
      app here is deliberately not as modularised as I would usually write it in a professional context.
    </p>
    <p>
      I've made the decision to have the back-end serve the front-end early on and you will find that the build mechanism
      described in the <a href="https://github.com/MrMatAP/mrmat-xmas-2023">mrmat-xmas-2023 repository</a> that produces
      all this will integrate the separate builds for back- and front-end. This saves me some (small) cost hosting this,
      but it's also the way I like it.
    </p>
    <p>
      Most modern front-ends are <a href="https://en.wikipedia.org/wiki/Single-page_application">Single Page Applications (SPA)</a>
      and the one you're looking at is no different. Classic web applications load each page you open in a browser separately,
      SPAs do the same in the background without a "reload". One exception: When you authenticate to the SPA with a
      modern authentication system then there are typically two redirections, first to a page controlled by the authentication
      system and then, if authenticated back to the page from where you came from. You're all doing this multiple times a day
      even if you don't notice it anymore and it's also not a problem, except when you have to do this with a front-end that
      is served by its own back-end application ;o). It all gets a bit complicated then because the back-end needs to
      respond for what really the front-end should process on its own. There are many ways to deal with that but all of
      them are ugly. It's the price for being thrifty.
    </p>
    <p>
      Azure WebApps have the most annoying habit of wanting to re-compile/re-package what you deliver it from source. I
      truly dislike that and want to give it just the final product to serve. I found it took quite a bit of convincing
      the Microsoft tools to do this for me, but I'm glad I did because it's what I totally would want in a professional
      context. As with many other things Microsoft, I find them almost good. Their documentation is severely lacking and
      their examples work for the simple use-cases they were thinking of. The moment you're just outside of that you'll
      be looking through their code. That's actually okay, but they're not helping themselves with inconsistent API
      documentation. Some things, such as the instrumentation of Python for telemetry, also plainly do not work.
    </p>
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