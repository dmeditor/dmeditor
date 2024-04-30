import { nanoid } from 'nanoid';

import type { DME } from '../..';
import { dmeConfig, getWidgetVariant } from '../..';

const listWidget: DME.Widget = {
  category: 'container',
  icon: 'list',
  name: 'List container',
  type: 'list',
  events: {
    createBlock: (variant?: string) => {
      const defaultStyle = dmeConfig.widgets['list']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      if (variant) {
        const variantDef = getWidgetVariant('list', variant);
        if (variantDef && variantDef.getDefaultData) {
          return variantDef.getDefaultData();
        }
      }
      return {
        id: nanoid(),
        data: {},
        type: 'list',
        ...styleObj,
        children: [],
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Direction',
      property: '.direction',
      settingComponent: 'button-group',
      parameters: {
        options: [
          { text: 'Vertical', value: 'vertical' },
          { text: 'Horizontal', value: 'horizontal' },
        ],
      },
    },
    {
      name: 'Align',
      property: '.align',
      settingComponent: 'button-group',
      parameters: {
        options: [
          { text: 'Left', value: 'left' },
          { text: 'Center', value: 'center' },
          { text: 'Right', value: 'end' },
        ],
      },
    },
  ],
};

export default listWidget;
