import 'i18next';
import translationNS from '@public/locales/en/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translationNS;
    };
  }
}
