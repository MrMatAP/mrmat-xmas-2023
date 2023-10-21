//
// i18n

import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        errorHeader: "Everything is fine... not",
        errorMessages: {
            unknown: "Something happened but we don't exactly know what it was. Try again later.",
            serverNotFound: 'The backend server did not find the requested information',
            serverDidNotAnswer: 'The backend server did not respond while preloading',
        },
    },
    de: {
        errorHeader: 'Alles ist gut... oder eben auch nicht',
        errorMessage: {
            unknown: "Da ist etwas passiert aber wir wissen nicht genau was. Probiers spaeter nochmal.",
            serverNotFound: 'Der server konnte keine Information finden',
            serverDidNotAnswer: 'Der server hat uns nicht geantwortet'
        },
    }
}

export const i18n = createI18n(({
    locale: 'en',
    messages
}))
