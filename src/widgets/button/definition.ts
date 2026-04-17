import { generalSettings, getCommonSettings, i18n, type DME, type DMEData } from '../..';

const buttonWidget: DME.Widget = {
  category: 'basic',
  icon: 'button',
  get name() {
    return i18n('Button', 'widget');
  },
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
      get name() {
        return i18n('Text', 'property-label');
      },
      property: '.value',
      settingComponent: 'input',
    },
    {
      get name() {
        return i18n('Link', 'property-label');
      },
      property: '.link',
      settingComponent: 'link',
    },
  ],
};

export default buttonWidget;
