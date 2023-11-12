import { reactive } from 'vue'

export class Identity {
    readonly id: string
    name: string = 'Stranger'
    greeting: string = 'Happy Holidays'
    language: string = 'en'
    userMessage: string = ''
    hasPicture: boolean = false
    pictureURL: string = '/tap-to-update.png'

    constructor(code: string) {
        this.id = code
    }

    static fromJSON(data: any): Identity {
        const identity = new Identity(data.id)
        identity.name = data.name
        identity.greeting = data.greeting
        identity.language = data.language
        identity.userMessage = data.userMessage
        identity.hasPicture = data.hasPicture
        identity.pictureURL = 'https://mrmat-xmas-api.azurewebsites.net/api/users/' + data.id + '/picture'
        return identity
    }
}

export const STRANGER = new Identity('-1')

export const store = reactive({
    version: 'unknown',
    appState: {
        isLoading: true,
        isError: false,
        errorMessageId: 'unknown'
    },
    identity: STRANGER
})
