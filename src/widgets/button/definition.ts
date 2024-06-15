import { nanoid } from 'nanoid';

import { dmeConfig, generalSettings, type DME, type DMEData } from '../..';

const buttonWidget: DME.Widget = {
  category: 'basic',
  icon: 'button',
  name: 'Button',
  type: 'button',
  events: {
    createBlock: (): DMEData.Block => {
      return {
        id: nanoid(),
        type: 'button',
        data: {
          value: 'New button',
          link: '#',
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Text',
      property: '.value',
      settingComponent: 'input',
    },
    {
      name: 'Link',
      property: '.link',
      settingComponent: 'link',
    },
    {
      name: 'Text align',
      property: 'settings.textAlign',
      settingComponent: 'align',
      category: 'block',
    },
    ...generalSettings,
  ],
};

export default buttonWidget;
