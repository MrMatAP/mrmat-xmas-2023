/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


// Plugins
import vuetify from "@/plugins/vuetify.ts";
import router from "@/router";
import { msalPlugin } from '@/plugins/msalPlugin'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

//
// Authentication

import { msalInstance } from "@/authConfig.ts";
import { PublicClientApplication } from '@azure/msal-browser';

//
// App

const app = createApp(App)
app.use(vuetify)
    .use(router)
    .use(msalPlugin, msalInstance as PublicClientApplication)
app.mount('#app')
