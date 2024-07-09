import { DME, DMEData } from '../../../core/types';

export const generalSettings: Array<DME.Setting> = [
  {
    name: 'Block width',
    settingComponent: 'range',
    property: 'settings.general.width',
    parameters: { min: 0, max: 700, step: 5 },
    category: 'style',
    group: 'style_block',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Self position',
    settingComponent: 'align',
    property: 'settings.general.align',
    category: 'style',
    group: 'style_block',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Background',
    settingComponent: 'color',
    property: 'settings.general.blockBackground',
    category: 'style',
    parameters: {
      colorGroup: 'background',
    },
    group: 'style_block',
    styleTags: ['block'],
  },
  {
    name: 'Padding',
    // settingComponent: 'range',
    settingComponent: 'padding',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
    category: 'style',
    styleTags: ['container'],
    group: 'style_block_container',
  },
  {
    name: 'Top margin',
    settingComponent: 'range',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100 },
    category: 'style',
    group: 'style_block_container',
    styleTags: ['list'],
  },
  {
    name: 'Background',
    settingComponent: 'color',
    property: 'settings.general.background',
    category: 'style',
    parameters: {
      colorGroup: 'background',
    },
    group: 'style_block_container',
    styleTags: ['container'],
  },
  {
    name: 'Full width',
    settingComponent: 'switch', //todo: make a full width so it will change general.padding also.
    property: 'settings.general.fullWidth',
    category: 'style',
    group: 'style_block_container',
    styleTags: ['root'],
  },
];
