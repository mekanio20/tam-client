import { createI18n } from 'vue-i18n'
import tk from './locales/tk.json'
import ru from './locales/ru.json'
const i18n = createI18n({
    locale: 'tk',
    fallbackLocale: 'ru',
    legacy: false,
    globalInjection: true,
    messages: {
        tk, ru
    },
})

  export default i18n