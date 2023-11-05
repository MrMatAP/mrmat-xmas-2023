//
// Routing

import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/AppHome.vue'
import MakingOf from "./components/MakingOf.vue";
import AppStranger from './components/AppStranger.vue'
import AppFailed from './components/AppFailed.vue'
import NotFound from './components/NotFound.vue'
import { auth_code } from './auth_code.ts'


declare module 'vue-router' {
    interface RouteMeta {
        requiresCodeAuthentication: boolean
    }
}

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
            meta: {
                requiresCodeAuthentication: true,
            }
        },
        {
            path: '/cl/:code?',
            name: 'codelogin',
            component: AppHome,
            meta: {
                requiresCodeAuthentication: true,
            }
        },
        {
            path: '/making-of',
            name: 'makingof',
            component: MakingOf,
            meta: {
                requiresCodeAuthentication: true,
            }
        },
        {
            path: '/stranger',
            name: 'stranger',
            component: AppStranger,
            meta: {
                requiresCodeAuthentication: false,
            }
        },
        {
            path: '/failed',
            name: 'failed',
            component: AppFailed,
            meta: {
                requiresCodeAuthentication: false,
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: {
                requiresCodeAuthentication: false,
            }
        }
    ]
})

router.beforeEach( async (to) => {
    if(! to.meta.requiresCodeAuthentication) return true
    if(to.meta.requiresCodeAuthentication) {
        if (! await auth_code.authenticate(to.params.code as string)) return { name: 'stranger' }
        if(to.name === 'codelogin') return { name: 'home', params: {} }
        return true
    }
    return { name: 'stranger' }
})
