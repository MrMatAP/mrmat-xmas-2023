import {reactive} from 'vue'

export const store = reactive({
    appState: {
        isLoading: true,
        isError: false,
        errorMessageId: 'unknown',
        version: '',
    },
    identity: {
        name: 'Stranger',
        greeting: 'Happy Holidays',
        isAdmin: false
    }
})
