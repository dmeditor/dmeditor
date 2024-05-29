import { DME, DMEData } from '../../../core/types';

export const generalSettings: Array<DME.Setting> = [
  {
    name: 'Width',
    settingComponent: 'range',
    property: 'settings.general.width',
    parameters: { min: 0, max: 700, step: 5 },
    category: 'block',
    group: 'block',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Align',
    settingComponent: 'align',
    property: 'settings.general.align',
    category: 'block',
    group: 'block',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Background',
    settingComponent: 'color',
    property: 'settings.general.blockBackground',
    category: 'block',
    group: 'block',
    styleTags: ['block'],
  },
  {
    name: 'Padding',
    settingComponent: 'range',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
    category: 'block',
    styleTags: ['core'],
    group: 'container',
  },
  {
    name: 'Top margin',
    settingComponent: 'range',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100 },
    category: 'block',
    group: 'container',
    styleTags: ['list'],
  },
  {
    name: 'Background',
    settingComponent: 'color', //todo: create background color component
    property: 'settings.general.background',
    category: 'block',
    group: 'container',
    styleTags: ['core'],
  },
];
