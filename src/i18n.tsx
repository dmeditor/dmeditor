import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import norNo from './locale/nor-NO.json';
import engGB from './locale/eng-GB.json';

const resources = {
  'eng-GB': engGB,
  'nor-NO': norNo
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "eng-GB",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;