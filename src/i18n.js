import { createI18n } from 'vue-i18n';
import es from './locales/es.json';
import en from './locales/en.json';

const i18n = createI18n({
    locale: localStorage.getItem('nh-locale') || 'es',
    fallbackLocale: 'en',
    messages: { es, en },
    globalInjection: true
});

export default i18n;
