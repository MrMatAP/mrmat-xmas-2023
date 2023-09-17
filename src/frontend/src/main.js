import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import './style.css'
import { messages } from './messages.js'
import App from './App.vue'
import AppHome from '@/components/AppHome.vue'
import AppAdmin from '@/components/AppAdmin.vue'

const i18n = createI18n({
    locale: 'en',
    messages
})

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: AppHome },
        { path: '/admin', component: AppAdmin }
    ]
})

const app= createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
