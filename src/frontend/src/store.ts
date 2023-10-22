import { reactive } from 'vue'

export const store = reactive({
    version: 'unknown',
    isCodeAuthenticated: false,
    isAADAuthenticated: false,
    isIdentified: false,
    appState: {
        isLoading: true,
        isError: false,
        errorMessageId: 'unknown',
    },
    identity: {
        id: undefined,
        name: 'Stranger',
        greeting: 'Happy Holidays',
        language: 'en',
        userMessage: '',
        hasPicture: false,
        pictureURL: '/tap-to-update.png'
    },
    admin: {
        identities: []
    }
})
