// Composables
import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import {msalInstance, loginRequest} from "@/authConfig";
import {InteractionType, PublicClientApplication, RedirectRequest} from "@azure/msal-browser";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
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

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if(to.meta.requiresAuth) {
    const request = {
      ...loginRequest,
      redirectStartPath: to.fullPath
    }
    const shouldProceed = await isAuthenticated(msalInstance, request)
    return shouldProceed || '/failed'
  }
})

export async function isAuthenticated(instance: PublicClientApplication, loginRequest: RedirectRequest): Promise<boolean> {
  return instance.handleRedirectPromise().then( () => {
    const accounts = instance.getAllAccounts()
    if(accounts.length > 0) {
      return true
    }

    return instance.loginRedirect(loginRequest).then( () => {
      return true
    }).catch( () => {
      return false
    })
  }).catch( () => {
    return false
  })
}

export default router
