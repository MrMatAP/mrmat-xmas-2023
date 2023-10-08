//
// Routing

import { createRouter, createWebHashHistory } from 'vue-router';
import AppHome from '@/components/AppHome.vue'
import AppAdmin from '@/components/AppAdmin.vue'
import AppFailed from '@/components/AppFailed.vue'
import { auth, loginRequest } from '@/auth.js';
import { store } from '@/store.js'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: AppHome
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AppAdmin,
            beforeEnter: () => {
                console.log('beforeEnter /admin')
                if(auth.getActiveAccount()) return true
                console.log('Currently unauthenticated, must dance')
                auth.loginRedirect(loginRequest)
                    .then( () => { return true })
                    .catch( (err) => {
                        console.log('Failed to login: ' + err)
                        return false
                    })
                return false
            }
        },
        {
            path: '/failed',
            name: 'Failed',
            component: AppFailed,
        }
    ]
})
router.beforeEach(async () => {
    console.log('beforeEnter /oauth-redirect')
    auth.handleRedirectPromise().then( () => {
        console.log('handleRedirectPromise')
        const accounts = auth.getAllAccounts()
        if(accounts.length > 0) {
            console.log('handleRedirectPromise sets the active account')
            auth.setActiveAccount(accounts[0])
            store.identity.isAdmin = true
            return true
        }
    }).catch( (err) => {
        console.log('An error occured during handleRedirectPromise: ' + err)
        return 'AppFailed'
    })
})
