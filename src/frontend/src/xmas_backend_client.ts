// Xmas Backend Client

import {Identity, store, STRANGER} from './store.ts'

class XmasBackendClient {

    readonly backendUrl: string = 'https://mrmat-xmas-api.azurewebsites.net/'

    constructor(backendUrl: string = 'https://mrmat-xmas-api.azurewebsites.net/') {
        this.backendUrl = backendUrl
    }

    async getUser(code: string): Promise<Identity> {
        return await fetch(this.backendUrl + '/api/users/' + code)
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

    userPicture(code: string): string {
        return this.backendUrl + '/api/users/' + code + '/picture?t=' + Date.now()
    }

    async postUserPicture(localImage: File) {
        return await fetch(this.backendUrl + '/api/users/' + store.identity.code + '/picture', {
            method: 'POST',
            headers: { 'Content-Type': localImage.type },
            body: localImage })
            .then( (response) => response.json )
            .then( () => { return true })
    }

    async removeUserPicture(): Promise<boolean> {
        return await fetch(this.backendUrl + '/api/users/' + store.identity.code + '/picture', {
            method: 'DELETE'
        }).then( (response) => {
            return response.status === 401 || response.status == 204;
        })
    }
}

export const xmas_backend_client = new XmasBackendClient()
