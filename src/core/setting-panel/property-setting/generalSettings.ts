import { DME, DMEData } from '../../../core/types';

export const generalSettings: Array<DME.Setting> = [
  {
    name: 'Padding',
    settingComponent: 'range',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
    category: 'block',
    styleTags: ['core'],
  },
  {
    name: 'Block width',
    settingComponent: 'range',
    property: 'settings.general.width',
    parameters: { min: 0, max: 700, step: 5 },
    category: 'block',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Block align',
    settingComponent: 'align',
    property: 'settings.general.align',
    category: 'block',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Top margin',
    settingComponent: 'range',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100 },
    category: 'block',
    styleTags: ['list'],
  },
  {
    name: 'Background',
    settingComponent: 'color', //todo: create background color component
    property: 'settings.general.background',
    category: 'block',
    styleTags: ['core'],
  },
];
