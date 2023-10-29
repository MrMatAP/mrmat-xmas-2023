// Code authentication

import { store } from './store.ts'
import { Identity, STRANGER } from './store.ts'

class CodeAuthentication {

    static LOCAL_STORAGE_KEY = 'code'
    isAuthenticated: boolean = false

    async authenticate(uriCode?: string): Promise<boolean> {
        if(this.isAuthenticated) return true
        try {
            store.appState.isLoading = true
            let code = uriCode || window.localStorage.getItem(CodeAuthentication.LOCAL_STORAGE_KEY)
            if(!code) throw Error('identityNotFound')
            store.identity = await this.authenticateFromCode(code)
            this.isAuthenticated = store.identity !== STRANGER
            window.localStorage.setItem(CodeAuthentication.LOCAL_STORAGE_KEY, code)
            return true
        } catch(error) {
            store.appState.isError = true
            store.appState.errorMessageId = (error as Error).message
            return false
        } finally {
            store.appState.isLoading = false
        }
    }

    private async authenticateFromCode(code: string): Promise<Identity> {
        console.log('Authenticating code ' + code)
        return await fetch('/api/users/' + code)
            .then(r => {
                if(r.status === 404) throw Error('resourceNotFound')
                return r.json()
            })
            .then(data => {
                return Identity.fromJSON(data)
            })
            .catch( (e) => {
                console.log('Got an exception ' + e.reason)
                return STRANGER
            })
    }
}

export const auth_code = new CodeAuthentication()
