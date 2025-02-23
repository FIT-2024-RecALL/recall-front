import i18next from 'i18next';
import localesBackend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(languageDetector)
  .use(localesBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });
