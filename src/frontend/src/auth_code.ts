// Code authentication

import { store } from './store.ts'
import {auth_aad} from "./auth_aad.ts";

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
        fetch('/api/users/' + code)
            .then(r => {
                if(r.status === 404) throw Error('resourceNotFound')
                return r.json()
            })
            .then(d => {
                store.identity.id = d.id
                store.identity.name = d.name
                store.identity.greeting = d.greeting
                store.identity.language = d.language
                store.appState.isLoading = false
                store.isCodeAuthenticated = true
                return true
            })
            .catch( (e) => {
                console.log('Got an exception ' + e.reason)
                store.appState.isError = true
                store.appState.errorMessageId = e.reason
                store.appState.isLoading = false
                return false
            })
    }
}

export const auth_code = new CodeAuthentication()
