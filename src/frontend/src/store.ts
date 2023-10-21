import {reactive} from 'vue'

export const store = reactive({
    isCodeAuthenticated: false,
    isAADAuthenticated: false,
    isIdentified: false,
    appState: {
        isLoading: true,
        isError: false,
        errorMessageId: 'unknown',
        version: '',
    },
    identity: {
        id: undefined,
        name: 'Stranger',
        greeting: 'Happy Holidays',
        language: 'en',

        year: 1970,
        isAdmin: false
    }
})
