/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { msalPlugin } from '@/plugins/msalPlugin'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { msalInstance } from "@/authConfig";
import { AuthenticationResult, EventType } from '@azure/msal-browser'

// Authentication

// const accounts = msalInstance.getAllAccounts()
// if(accounts.length > 0) {
//   msalInstance.setActiveAccount(accounts[0])
// }
// msalInstance.addEventCallback( (event) => {
//   if(event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
//     const payload = event.payload as AuthenticationResult
//       const account = payload.account
//       msalInstance.setActiveAccount(account)
//   }
// })

const app = createApp(App)
registerPlugins(app)
app.use(msalPlugin, msalInstance)
app.mount('#app')
