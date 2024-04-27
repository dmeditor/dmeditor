import { nanoid } from 'nanoid';

import { dmeConfig } from '../..';
import type { DME, DMEData } from '../..';

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
  ],
};

export default buttonWidget;
