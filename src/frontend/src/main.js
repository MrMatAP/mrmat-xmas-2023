import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import './style.css'
import { messages } from './messages.js'
import App from './App.vue'
import Home from '@/components/Home.vue'
import Admin from '@/components/Admin.vue'

const i18n = createI18n({
    locale: 'en',
    messages
})

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/admin', component: Admin }
    ]
})

const app= createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
