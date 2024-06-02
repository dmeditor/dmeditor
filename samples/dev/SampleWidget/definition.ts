import { nanoid } from 'nanoid';

import { generalSettings } from '../../../src';

export const sampleWidgetDef = {
  type: 'sample',
  name: 'Sample widget',
  category: 'basic',
  icon: 'A',
  settings: [
    {
      name: 'Inside background',
      settingComponent: 'color',
      category: 'block',
      property: 'settings.backgroundColor',
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
        level: 2,
        settings: {
          width: 100,
          backgroundColor: '#cccccc',
          general: {
            background: '#FFFDDB',
          },
        },
      },
    }),
  },
};
