//
// Routing

import {createRouter, createWebHistory} from 'vue-router';
import AppHome from './components/AppHome.vue'
import MakingOf from "./components/MakingOf.vue";
import AppStranger from './components/AppStranger.vue'
import AppAdmin from './components/AppAdmin.vue'
import AppFailed from './components/AppFailed.vue'
import NotFound from './components/NotFound.vue'
import {Identity, store} from './store.js'
import { auth_code } from './auth_code.ts'
import { auth_aad, AADAuthentication } from './auth_aad.ts'

declare module 'vue-router' {
    interface RouteMeta {
        requiresCodeAuthentication: boolean
        requiresAADAuthentication: boolean
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
                requiresAADAuthentication: false
            }
        },
        {
            path: '/cl/:code?',
            name: 'codelogin',
            component: AppHome,
            meta: {
                requiresCodeAuthentication: true,
                requiresAADAuthentication: false
            }
        },
        {
            path: '/aadlogin',
            name: 'aadlogin',
            component: AppHome,
            meta: {
                requiresCodeAuthentication: false,
                requiresAADAuthentication: true
            }
        },
        {
            path: '/making-of',
            name: 'makingof',
            component: MakingOf,
            meta: {
                requiresCodeAuthentication: true,
                requiresAADAuthentication: false
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AppAdmin,
            meta: {
                requiresCodeAuthentication: false,
                requiresAADAuthentication: true
            },
        },
        {
            path: '/stranger',
            name: 'stranger',
            component: AppStranger,
            meta: {
                requiresCodeAuthentication: false,
                requiresAADAuthentication: false
            }
        },
        {
            path: '/failed',
            name: 'failed',
            component: AppFailed,
            meta: {
                requiresCodeAuthentication: false,
                requiresAADAuthentication: false
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: {
                requiresCodeAuthentication: false,
                requiresAADAuthentication: false
            }
        }
    ]
})

router.beforeEach( async (to) => {
    if(! to.meta.requiresCodeAuthentication && ! to.meta.requiresAADAuthentication) return true
    if(to.meta.requiresCodeAuthentication) {
        if (! await auth_code.authenticate(to.params.code as string)) return { name: 'stranger' }
        if(to.name === 'codelogin') return { name: 'home', params: {} }
        return true
    }
    if(to.meta.requiresAADAuthentication) {
        if(auth_aad.isAuthenticated) return true
        await auth_aad.auth.handleRedirectPromise()
        if(auth_aad.auth.getAllAccounts().length > 0) {
            let defaultAccount = auth_aad.auth.getAllAccounts()[0]
            auth_aad.auth.setActiveAccount(defaultAccount)
            store.identity = Identity.fromAAD(defaultAccount)
            auth_aad.isAuthenticated = true
            return true
        }
        return await auth_aad.auth.loginRedirect(AADAuthentication.loginRequest)
    }
    return { name: 'stranger' }
})
