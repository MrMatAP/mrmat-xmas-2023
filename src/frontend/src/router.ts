//
// Routing

import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/AppHome.vue'
import AppStranger from './components/AppStranger.vue'
import AppError from './components/AppError.vue'
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
            component: AppError,
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
        if(await auth_code.authenticate(to.query.c as string)) return true
    }
    return { path: '/stranger' }
})
