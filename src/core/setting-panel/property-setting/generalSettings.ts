import { DME, DMEData } from '../../../core/types';

export const generalSettings: Array<DME.Setting> = [
  {
    name: 'Width',
    settingComponent: 'distance',
    property: 'settings.general.width',
    parameters: { min: 0, max: 700, step: 5 },
    category: 'style',
    group: 'style_content',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Self align',
    settingComponent: 'align',
    property: 'settings.general.align',
    category: 'style',
    group: 'style_content',
    styleTags: ['block', 'list'],
  },
  {
    name: 'Padding',
    // settingComponent: 'range',
    settingComponent: 'padding',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
    category: 'style',
    styleTags: ['container'],
    group: 'style_block',
  },
  {
    name: 'Top margin',
    settingComponent: 'distance',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100, allowedUnit: 'px' },
    category: 'style',
    description: 'Distance to preivous block',
    group: 'style_block',
    styleTags: ['list'],
  },
  {
    name: 'Border width',
    settingComponent: 'distance',
    property: 'settings.general.borderWidth',
    parameters: { min: 0, max: 10, allowedUnit: 'px' },
    category: 'style',
    styleTags: ['container'],
    group: 'style_block',
  },
  {
    name: 'Border color',
    settingComponent: 'color',
    property: 'settings.general.borderColor',
    parameters: {
      colorGroup: 'border',
    },
    category: 'style',
    styleTags: ['container'],
    group: 'style_block',
  },
  {
    name: 'Border radius',
    settingComponent: 'distance',
    property: 'settings.general.borderRadius',
    parameters: { min: 0, max: 50, allowedUnit: 'px' },
    category: 'style',
    styleTags: ['container'],
    group: 'style_block',
  },
  {
    name: 'Background',
    settingComponent: 'color',
    property: 'settings.general.background',
    category: 'style',
    parameters: {
      colorGroup: 'background',
    },
    group: 'style_block',
    styleTags: ['container'],
  },
  {
    name: 'Full width',
    settingComponent: 'switch',
    property: 'settings.general.fullWidth',
    category: 'style',
    description:
      'If on by default content is still in normal width but background color will be full.',
    group: 'style_block',
    styleTags: ['root'],
  },
  {
    name: 'Content following full width',
    settingComponent: 'switch',
    property: 'settings.general.fullWidthContent',
    description: 'Only work when full width is on.',
    display: {
      labelFullWidth: true,
    },
    category: 'style',
    group: 'style_block',
    styleTags: ['root'],
  },
];
