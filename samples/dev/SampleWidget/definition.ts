import { nanoid } from 'nanoid';

import { generalSettings } from '../../../src';

export const sampleWidgetDef = {
  type: 'sample',
  name: 'Sample widget',
  category: 'basic',
  icon: 'A',
  settings: [
    {
      name: 'Text',
      settingComponent: 'input',
      property: '.text',
    },
    {
      name: 'Inside background',
      settingComponent: 'color',
      category: 'block',
      property: 'settings.insideBackground',
    },
    {
      name: 'From date',
      settingComponent: 'date',
      property: 'settings.date',
      parameters: {
        withTime: true,
      },
    },
    {
      name: 'Width',
      settingComponent: 'setting_input',
      category: 'block',
      property: 'settings.width',
    },
    ...generalSettings,
  ],
  events: {
    createBlock: () => ({
      id: nanoid(),
      type: 'sample',
      data: {
        text: 'Sample',
        settings: {
          width: 300,
          insideBackground: '#cccccc',
          general: {
            background: '#FFFDDB',
          },
        },
      },
    }),
  },
};
