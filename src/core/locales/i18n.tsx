import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import engGB from './lang/eng-GB.json';
import norNo from './lang/nor-NO.json';

const resources = {
  'eng-GB': engGB,
  'nor-NO': norNo,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'eng-GB',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
