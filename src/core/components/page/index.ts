import { dmeConfig } from 'dmeditor/config';
import { DME } from 'dmeditor/types/dmeditor';

let pageSettings: Array<DME.PageSetting> = [];

const setPageSettings = (settings: Array<DME.PageSetting>) => {
  pageSettings = settings;
};

const getPageSettings = (): Array<DME.PageSetting> => {
  return pageSettings;
};

const getPageTheme = (identifier: string) => {
  return dmeConfig.general.themes.find((theme) => theme.identifier === identifier);
};

export { setPageSettings, getPageSettings, getPageTheme };
