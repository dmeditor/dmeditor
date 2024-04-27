import i18nCore from 'i18next';

import engGB from '../../locales/eng-GB.json';
import norNo from '../../locales/nor-NO.json';

const resources = {
  'eng-GB': engGB,
  'nor-NO': norNo,
};

const initLanguage = (language: string) => {
  i18nCore.init({
    resources,
    lng: language,
    interpolation: {
      escapeValue: false,
    },
  });
};

const i18n = (text: string, ns?: string) => {
  return i18nCore.t(text, ns ? { ns: ns } : {});
};

export { initLanguage, i18n };
