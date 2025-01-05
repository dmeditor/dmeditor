import { generalSettings, i18n, type DME, type DMEData } from '../..';

const buttonWidget: DME.Widget = {
  category: 'basic',
  icon: 'button',
  name: i18n('Button', 'widget'),
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
    ...generalSettings,
  ],
};

export default buttonWidget;
