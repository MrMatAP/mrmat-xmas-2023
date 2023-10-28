//
// i18n

import { createI18n } from 'vue-i18n'


export const i18n = createI18n(({
    locale: 'en',
    en: {
        errorHeader: "Everything is fine... not",
        errorUnknown: "Something happened but we don't exactly know what it was. Try again later.",
        serverNotFound: 'The backend server did not find the requested information',
        serverDidNotAnswer: 'The backend server did not respond while preloading',
        identityNotFound: 'Unknown Identity'
    },
    de: {
        errorHeader: 'Alles ist gut... oder eben auch nicht',
        errorUnknown: "Da ist etwas passiert aber wir wissen nicht genau was. Probiers spaeter nochmal.",
        serverNotFound: 'Der server konnte keine Information finden',
        serverDidNotAnswer: 'Der server hat uns nicht geantwortet',
        identityNotFound: 'Unbekannte Identitaet',
    }
}))
