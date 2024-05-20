import { DMEData } from 'dmeditor/core/types';

export const generalSettings = [
  {
    name: 'Padding',
    settingComponent: 'range',
    property: 'settings.general.padding',
    parameters: { min: 0, max: 100 },
  },
  {
    name: 'Width',
    settingComponent: 'input',
    property: 'settings.general.width',
  },
  {
    name: 'Align',
    settingComponent: 'align',
    property: 'settings.general.align',
  },
  {
    name: 'Top margin',
    settingComponent: 'range',
    property: 'settings.general.marginTop',
    parameters: { min: 0, max: 100 },
  },
  // {
  //   name: 'Background',
  //   settingComponent: 'input', //todo: create background color component
  //   property: 'settings.background',
  // },
];
