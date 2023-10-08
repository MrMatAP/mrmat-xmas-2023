import { createApp } from 'vue'
import { i18n } from '@/i18n.js'
import { router } from '@/router.js'
import '@/style.css'
import App from './App.vue'

const app= createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
