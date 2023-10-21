import {reactive} from 'vue'

export const store = reactive({
    isAADAuthenticated: false,
    isIdentified: false,
    appState: {
        isLoading: true,
        isError: false,
        errorMessageId: 'unknown',
        version: '',
    },
    identity: {
        id: 0,
        name: 'Stranger',
        year: 1970,
        greeting: 'Happy Holidays',
        isAdmin: false
    }
})
