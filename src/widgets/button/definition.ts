import { generalSettings, type DME, type DMEData } from '../..';

const buttonWidget: DME.Widget = {
  category: 'basic',
  icon: 'button',
  name: 'Button',
  type: 'button',
  events: {
    createBlock: (): DMEData.CreatedBlock => {
      return {
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
      category: 'style',
    },
    ...generalSettings,
  ],
};

export default buttonWidget;
