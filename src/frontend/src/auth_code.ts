// Code authentication

import { store } from './store.ts'
import { Identity, STRANGER } from './store.ts'

class CodeAuthentication {

    static LOCAL_STORAGE_KEY = 'code'
    static VERSION_HEADER = 'X-Version'
    isAuthenticated: boolean = false

    async authenticate(uriCode?: string): Promise<boolean> {
        if(this.isAuthenticated) return true
        try {
            store.appState.isLoading = true
            let code = uriCode || window.localStorage.getItem(CodeAuthentication.LOCAL_STORAGE_KEY)
            if(!code) throw Error('identityNotFound')
            store.identity = await this.authenticateFromCode(code)
            this.isAuthenticated = store.identity.id !== STRANGER.id
            window.localStorage.setItem(CodeAuthentication.LOCAL_STORAGE_KEY, code)
            return this.isAuthenticated
        } catch(error) {
            // It is not an error to be a stranger
            return false
        } finally {
            store.appState.isLoading = false
        }
    }

    private async authenticateFromCode(code: string): Promise<Identity> {
        console.log('Authenticating code ' + code)
        return await fetch('/api/users/' + code)
            .then(r => {
                store.version = r.headers.get(CodeAuthentication.VERSION_HEADER) || 'unknown'
                if(! r.ok) throw Error('unauthorised')
                return r.json()
            })
            .then(data => { return Identity.fromJSON(data) })
            .catch(e => {
                console.log('Exception while authenticating: ' + e.message)
                return STRANGER
            })
    }
}

export const auth_code = new CodeAuthentication()
