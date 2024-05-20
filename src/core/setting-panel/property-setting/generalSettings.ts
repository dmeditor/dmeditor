import { DMEData } from 'dmeditor/core/types';

export const generalSettings = [
  {
    name: 'Padding',
    settingComponent: 'range',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
    category: 'block',
  },
  {
    name: 'Width',
    settingComponent: 'range',
    property: 'settings.general.width',
    parameters: { min: 0, max: 700, step: 5 },
    category: 'block',
  },
  {
    name: 'Block align',
    settingComponent: 'align',
    property: 'settings.general.align',
    category: 'block',
  },
  {
    name: 'Top margin',
    settingComponent: 'range',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100 },
    category: 'block',
  },
  // {
  //   name: 'Background',
  //   settingComponent: 'input', //todo: create background color component
  //   property: 'settings.background',
  // },
];
