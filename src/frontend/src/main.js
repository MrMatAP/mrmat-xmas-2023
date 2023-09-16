import { createApp } from 'vue'
import './style.css'
import { messages } from './messages.js'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

const i18n = createI18n({
    locale: 'en',
    messages
})

const app= createApp(App)
app.use(i18n)
app.mount('#app')
