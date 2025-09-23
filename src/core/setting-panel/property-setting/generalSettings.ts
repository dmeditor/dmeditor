import { DME, DMEData } from '../../../core/types';

const generalTypes = {
  default: [
    'content-width',
    'content-self-align',
    'container-padding',
    'container-margin-top',
    'container-border-width',
    'container-border-color',
    'container-border-radius',
    'container-background-color',
    'container-full-width',
    'container-full-width-content',
  ],
  none: [],
  container: [
    'container-padding',
    'container-margin-top',
    'container-border-width',
    'container-border-color',
    'container-border-radius',
    'container-background-color',
    'container-full-width',
    'container-full-width-content',
  ],
};

export const generalSettings: Array<DME.Setting> = [
  {
    name: 'Width',
    identifier: 'content-width',
    settingComponent: 'distance',
    property: 'settings.general.width',
    parameters: { min: 0, max: 700, step: 5, defaultUnit: '%' },
    category: 'style',
    group: 'style_element',
    appliedDevices: ['desktop', 'mobile'],
    styleTags: ['block', 'list', 'general'],
  },
  {
    name: 'Self align',
    identifier: 'content-self-align',
    settingComponent: 'align',
    property: 'settings.general.align',
    category: 'style',
    group: 'style_element',
    styleTags: ['block', 'list', 'general'],
  },
  {
    name: 'Padding',
    identifier: 'container-padding',
    // settingComponent: 'range',
    settingComponent: 'padding',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
    category: 'style',
    appliedDevices: ['desktop', 'mobile'],
    styleTags: ['container', 'general'],
    group: 'style_block',
  },
  {
    name: 'Top margin',
    identifier: 'container-margin-top',
    settingComponent: 'distance',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100, allowedUnit: 'px' },
    category: 'style',
    description: 'Distance to preivous block',
    group: 'style_block',
    appliedDevices: ['desktop', 'mobile'],
    styleTags: ['list', 'general'],
  },
  {
    name: 'Border width',
    identifier: 'container-border-width',
    settingComponent: 'distance',
    property: 'settings.general.borderWidth',
    parameters: { min: 0, max: 10, allowedUnit: 'px' },
    category: 'style',
    styleTags: ['container', 'general'],
    group: 'style_block',
  },
  {
    name: 'Border color',
    identifier: 'container-border-color',
    settingComponent: 'color',
    property: 'settings.general.borderColor',
    parameters: {
      colorGroup: 'border',
    },
    category: 'style',
    styleTags: ['container', 'general'],
    group: 'style_block',
  },
  {
    name: 'Border radius',
    identifier: 'container-border-radius',
    settingComponent: 'distance',
    property: 'settings.general.borderRadius',
    parameters: { min: 0, max: 50, allowedUnit: 'px' },
    category: 'style',
    styleTags: ['container', 'general'],
    group: 'style_block',
  },
  {
    name: 'Background',
    identifier: 'container-background-color',
    settingComponent: 'color',
    property: 'settings.general.background',
    category: 'style',
    parameters: {
      colorGroup: 'background',
    },
    group: 'style_block',
    styleTags: ['container', 'general'],
  },
  {
    name: 'Background image',
    identifier: 'container-background-image',
    property: 'settings.general.backgroundImage',
    category: 'style',
    styleTags: ['container', 'general'],
    group: 'style_block',
    settingComponent: 'background-image',
  },
  {
    name: 'Full width',
    identifier: 'container-full-width',
    settingComponent: 'switch',
    property: 'settings.general.fullWidth',
    category: 'style',
    description:
      'If on by default content is still in normal width but background color will be full.',
    group: 'style_block',
    styleTags: ['root', 'general'],
  },
  {
    name: 'Content following full width',
    identifier: 'container-full-width-content',
    settingComponent: 'switch',
    property: 'settings.general.fullWidthContent',
    description: 'Only work when full width is on.',
    display: {
      labelFullWidth: true,
    },
    category: 'style',
    group: 'style_block',
    styleTags: ['root', 'general'],
  },
];

export const getCommonSettings = (
  settingType: 'default' | 'none' | 'container' = 'default',
  extra?: Array<string>,
): Array<DME.Setting> => {
  const list = [...(generalTypes[settingType] || []), ...(extra || [])];
  const result: Array<DME.Setting> = [];
  for (const item of generalSettings) {
    if (list.includes(item.identifier || '')) {
      result.push(item);
    }
  }
  return result;
};
