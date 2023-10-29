import { reactive } from 'vue'
import {AccountInfo, AuthenticationResult} from "@azure/msal-browser";

export class Identity {
    readonly code: string
    name: string = 'Stranger'
    greeting: string = 'Happy Holidays'
    language: string = 'en'
    userMessage: string = ''
    hasPicture: boolean = false
    pictureURL: string = '/tap-to-update.png'

    constructor(code: string) {
        this.code = code
    }

    static fromJSON(data: any): Identity {
        const identity = new Identity(data.code)
        identity.name = data.name
        identity.greeting = data.greeting
        identity.language = data.language
        identity.userMessage = data.userMessage
        identity.hasPicture = data.hasPicture
        identity.pictureURL = data.pictureURL
        return identity
    }

    static fromAAD(data: AccountInfo): Identity {
        const identity = new Identity(data.localAccountId)
        identity.name = data.name || 'AAD Person'
        return identity
    }
}

export const STRANGER = new Identity('-1')

export const store = reactive({
    version: 'unknown',
    isAADAuthenticated: false,
    appState: {
        isLoading: true,
        isError: false,
        errorMessageId: 'unknown',
    },
    identity: STRANGER,
    admin: {
        identities: []
    }
})
