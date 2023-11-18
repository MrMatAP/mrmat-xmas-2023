// Xmas Backend Client

import { store } from './store.ts'
import { appInsights } from './telemetry.ts'

class XmasBackendClient {

    userPicture(code: string): string {
        return '/api/users/' + code + '/picture?t=' + Date.now()
    }

    async postUserPicture(localImage: File) {
        console.dir(localImage)
        const formData = new FormData()
        formData.append('file', localImage)
        return await fetch('/api/users/' + store.identity.id + '/picture', {
            method: 'POST',
            body: formData })
            .then( (response) => response.json )
            .then( () => {
                appInsights.trackEvent({ name: 'postUserPicture' })
                store.identity.hasPicture = true
                return true
            })
    }

    async putUserMessage() {
        return await fetch('/api/users/' + store.identity.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(store.identity) })
            .then( (response) => response.json )
            .then( () => {
                appInsights.trackEvent({ name: 'putUserMessage' })
                return true
            })
    }
}

export const xmas_backend_client = new XmasBackendClient()
