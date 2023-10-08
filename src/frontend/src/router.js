//
// Routing

import { createRouter, createWebHashHistory } from 'vue-router';
import AppHome from '@/components/AppHome.vue'
import AppStranger from '@/components/AppStranger.vue'
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
            component: AppHome,
        },
        {
            path: '/stranger',
            name: 'Stranger',
            component: AppStranger
        },
        {
            path: '/landing/:user_id',
            name: 'Landing',
            redirect: to => {
                fetch('/api/landing/' + to.params.user_id)
                    .then(r => { return r.json() })
                    .then(d => {
                        store.isIdentified = true
                        store.identity.id = d.id
                        store.identity.name = d.name
                        store.identity.year = d.year
                        return { name: 'Home' }
                    })
                return { name: 'Stranger' }
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AppAdmin,
            beforeEnter: () => {
                if(! store.isAADAuthenticated) return { name: 'AppFailed' }
                return true
            }
            // beforeEnter: () => {
            //     if(auth.getActiveAccount()) return true
            //     auth.loginRedirect(loginRequest)
            //         .then( () => {
            //             store.isAADAuthenticated = true
            //             store.identity.id = auth.getActiveAccount().nativeAccountId
            //             store.identity.name = auth.getActiveAccount().name
            //             store.identity.year = 2023
            //             console.log('Logged in')
            //             return { name: 'Admin' }
            //         })
            //         .catch( (err) => {
            //             console.log('Failed to login: ' + err)
            //             return { name: 'Failed' }
            //         })
            //     return false
            // }
        },
        {
            path: '/:code',
            name: 'OAuthResponse',
            redirect: () => {
                auth.handleRedirectPromise().then( () => {
                    const accounts = auth.getAllAccounts()
                    if(accounts.length > 0) {
                        auth.setActiveAccount(accounts[0])
                        return { name: 'Admin' }
                    }
                }).catch( (err) => {
                    console.log('An error occured during handleRedirectPromise: ' + err)
                    return { name: 'Failed' }
                })
            }
        },
        {
            path: '/failed',
            name: 'Failed',
            component: AppFailed,
        }
    ]
})
router.beforeEach( (to) => {
    if(! store.isAADAuthenticated && to.name === 'Admin') {
        if(auth.getActiveAccount()) return true
        auth.loginRedirect(loginRequest)
            .then( () => {
                store.isAADAuthenticated = true
                store.identity.id = auth.getActiveAccount().nativeAccountId
                store.identity.name = auth.getActiveAccount().name
                store.identity.year = 2023
                console.log('Logged in')
                return true
            })
            .catch( (err) => {
                console.log('Failed to login: ' + err)
                return { name: 'Failed' }
            })
        return false
    }
    if(store.isIdentified || store.isAADAuthenticated || to.name === 'OAuthResponse' || to.name === 'Stranger') return true
    return { name: 'Stranger' }
})
// router.beforeEach(async (to) => {
//     if (! to.name || to.name === 'Stranger') return true
//     auth.handleRedirectPromise().then( () => {
//         const accounts = auth.getAllAccounts()
//         if(accounts.length > 0) {
//             auth.setActiveAccount(accounts[0])
//             store.identity.isAdmin = true
//             return true
//         }
//     }).catch( (err) => {
//         console.log('An error occured during handleRedirectPromise: ' + err)
//         return 'AppFailed'
//     })
// })
