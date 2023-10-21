//
// Routing

import {createRouter, createWebHistory} from 'vue-router';
import AppHome from './components/AppHome.vue'
import AppStranger from './components/AppStranger.vue'
import AppAdmin from './components/AppAdmin.vue'
import AppFailed from './components/AppFailed.vue'
import NotFound from './components/NotFound.vue'
import { store } from './store.js'
import { auth_code } from './auth_code.ts'
import { auth_aad } from './auth_aad.ts'

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
            name: 'Home',
            component: AppHome,
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
            name: 'Stranger',
            component: AppStranger,
        },
        {
            path: '/failed',
            name: 'Failed',
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

/**
 * Navigation Guard to protect page access without the necessary authentication.
 * This is called before entering all routes and configured by two meta fields in the route object itself. We support
 * to forms of authentication, the 'Code Authentication' from users provided by a query parameter and proper AAD
 * authentication for the admin interface.
 *
 * The guard will grant access to target routes configured to require code authentication if the store considers the
 * user to be code authenticated. Otherwise the codeauth object will be asked to authenticate the user based on a
 * query parameter and access granted if authentication succeeds. The user is redirected to the desired path but with the query
 * parameters explicitly removed.
 *
 * The user is redirected to the Stranger page if the query parameter is missing or it fails authentication.
 *
 * TODO: Actually remove the query parameter somehow
 */
router.beforeEach( async (to) => {
    if(to.meta.requiresCodeAuthentication) {
        console.log('Route ' + (to.name as string) + ' requires code authentication')
        if(store.isCodeAuthenticated) {
            console.log('Already code authenticated (in beforeEach)')
            return true
        }
        await auth_code.authenticate(to.query.c as string).then( (result) => {
            if(result) return { name: to.name, query: {} }
            return { name: 'Stranger' }
        })
    } else if(to.meta.requiresAADAuthentication) {
        console.log('Route ' + (to.name as string) + ' requires aad authentication')
        console.dir(to)
        if(store.isAADAuthenticated) {
            console.log('Already AAD authenticated (in beforeEach)')
            return true
        }
        if(to.hash) {
            await auth_aad.handleRedirect()
        } else {
            await auth_aad.authenticate().then( (result) => {
                if(result) return true
                return { name: 'Stranger' }
            })
        }
    }
    return true
})
