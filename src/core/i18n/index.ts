import i18nCore from 'i18next';

import chiCN from '../../locales/chi-CN.json';
import engGB from '../../locales/eng-GB.json';
import norNo from '../../locales/nor-NO.json';

const resources = {
  'eng-GB': engGB,
  'nor-NO': norNo,
  'chi-CN': chiCN,
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

initLanguage('eng-GB');

const i18n = (text: string, ns?: string) => {
  return i18nCore.t(text, ns ? { ns: ns } : {});
};

export { initLanguage, i18n };
