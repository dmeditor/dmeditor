import i18nCore from 'i18next';

import chiCN from '../../locales/chi-CN.json';
import engGB from '../../locales/eng-GB.json';
import norNo from '../../locales/nor-NO.json';

const resources = {
  'eng-GB': engGB,
  'nor-NO': norNo,
  'chi-CN': chiCN,
};

const dmeI18n = i18nCore.createInstance();

dmeI18n.init({
  resources,
  lng: 'eng-GB',
  interpolation: {
    escapeValue: false,
  },
});

const initLanguage = (language: string) => {
  dmeI18n.changeLanguage(language);
};

const i18n = (text: string, ns?: string) => {
  return dmeI18n.t(text, ns ? { ns: ns } : {});
};

export { initLanguage, i18n, dmeI18n };
