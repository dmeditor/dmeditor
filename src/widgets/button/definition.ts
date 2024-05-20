import { nanoid } from 'nanoid';

import { dmeConfig, type DME, type DMEData } from '../..';
import { generalSettings } from '../../core/setting-panel/property-setting';

const buttonWidget: DME.Widget = {
  category: 'widget',
  icon: 'button',
  name: 'Button',
  type: 'button',
  events: {
    createBlock: (): DMEData.Block => {
      const defaultStyle = dmeConfig.widgets['button']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      return {
        id: nanoid(),
        type: 'button',
        ...styleObj,
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
