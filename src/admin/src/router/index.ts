// Composables
import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import {PublicClientApplication, RedirectRequest} from "@azure/msal-browser";
import { msalInstance, loginRequest } from '@/authConfig.ts'


const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                meta: {
                    requiresAuth: true
                },
                // route level code-splitting
                // this generates a separate chunk (Home-[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('@/views/Home.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach(async (to: RouteLocationNormalized) => {
    if (to.meta.requiresAuth) {
        const request = {
            ...loginRequest,
            redirectStartPath: to.fullPath
        }
        const shouldProceed = await isAuthenticated(msalInstance as PublicClientApplication, request)
        return shouldProceed || '/failed'
    }
})

export async function isAuthenticated(instance: PublicClientApplication, loginRequest: RedirectRequest): Promise<boolean> {
    return instance.handleRedirectPromise()
        .then(() => {
            const accounts = instance.getAllAccounts()
            if (accounts.length > 0) {
                instance.setActiveAccount(accounts[0])
                return true
            }

            return instance.loginRedirect(loginRequest)
                .then(() => { return true })
                .catch(() => { return false })
        })
        .catch(() => { return false })
}

export default router
