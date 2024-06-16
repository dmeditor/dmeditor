import { DME, DMEData } from '../../../core/types';

export const generalSettings: Array<DME.Setting> = [
  {
    name: 'Content width',
    settingComponent: 'range',
    property: 'settings.general.width',
    parameters: { min: 0, max: 700, step: 5 },
    category: 'style',
    group: 'style_content',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Position',
    settingComponent: 'align',
    property: 'settings.general.align',
    category: 'style',
    group: 'style_content',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Background',
    settingComponent: 'color',
    property: 'settings.general.blockBackground',
    category: 'style',
    group: 'style_content',
    styleTags: ['block'],
  },
  {
    name: 'Padding',
    settingComponent: 'range',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
    category: 'style',
    styleTags: ['container'],
    group: 'style_block',
  },
  {
    name: 'Top margin',
    settingComponent: 'range',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100 },
    category: 'style',
    group: 'style_block',
    styleTags: ['list'],
  },
  {
    name: 'Background',
    settingComponent: 'color', //todo: create background color component
    property: 'settings.general.background',
    category: 'style',
    group: 'style_block',
    styleTags: ['container'],
  },
  {
    name: 'Full width',
    settingComponent: 'switch', //todo: make a full width so it will change general.padding also.
    property: 'settings.general.fullWidth',
    category: 'style',
    group: 'style_block',
    styleTags: ['root'],
  },
];
