import { ComponentType } from 'react';

import { dmeConfig } from '../../config';
import type { DME } from '../../types/dmeditor';

let pageSettings: Array<DME.PageSetting | ComponentType> = [];

const setPageSettings = (settings: Array<DME.PageSetting | ComponentType>) => {
  pageSettings = settings;
};

const getPageSettings = (): Array<DME.PageSetting | ComponentType> => {
  return pageSettings;
};

const getPageTheme = (identifier: string) => {
  return dmeConfig.general.themes.find((theme) => theme.identifier === identifier);
};

export { setPageSettings, getPageSettings, getPageTheme };
