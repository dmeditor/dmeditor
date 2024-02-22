import { DME } from 'Src/core/types/dmeditor';

let pageSettings: Array<DME.PageSetting> = [];

const pageThemes: Array<DME.PageTheme> = [];

const setPageSettings = (settings: Array<DME.PageSetting>) => {
  pageSettings = settings;
};

const registerTheme = (theme: DME.PageTheme) => {
  if (getPageTheme(theme.identifier)) {
    console.warn(`Theme ${theme.identifier} has been registered. Ignore.`);
    return;
  }
  pageThemes.push(theme);
};

const getPageSettings = (): Array<DME.PageSetting> => {
  return pageSettings;
};

const getPageTheme = (identifier: string) => {
  return pageThemes.find((theme) => theme.identifier === identifier);
};

export { setPageSettings, getPageSettings, pageThemes, registerTheme, getPageTheme };
