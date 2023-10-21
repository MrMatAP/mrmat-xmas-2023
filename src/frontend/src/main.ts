import { createApp } from 'vue'
import { i18n } from './i18n.ts'
import { router } from './router.ts'
import '@/style.css'
import App from './App.vue'

const app= createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
