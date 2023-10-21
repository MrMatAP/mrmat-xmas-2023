// Code authentication

import { store } from './store.ts'

class CodeAuthentication {

    async authenticate(code: string) {
        if(store.isCodeAuthenticated) {
            console.log('Already code authenticated')
            return true
        }
        if(! code) {
            console.log('Needs authentication but has no code')
            return false
        }

        console.log('Authenticating code ' + code)
        store.isCodeAuthenticated = true
        // store.identity.id = code
        store.identity.name = 'John Doe'
        return true
    }
}

export const auth_code = new CodeAuthentication()
