import { nanoid } from 'nanoid';

import type { DME } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant } from '../..';

const listWidget: DME.Widget = {
  category: 'design',
  icon: 'list',
  name: 'List',
  type: 'list',
  widgetType: 'list',
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
        data: { setting: { general: { padding: 5 } } },
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
      category: 'block',
      styleTags: ['core'],
      settingComponent: 'button-group',
      parameters: {
        options: [
          { text: 'Vertical', value: 'vertical' },
          { text: 'Horizontal', value: 'horizontal' },
        ],
      },
    },
    ...generalSettings,
  ],
};

export default listWidget;
