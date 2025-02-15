import type { DME } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, getWidgetVariant, i18n } from '../..';

const listWidget: DME.Widget = {
  category: 'design',
  icon: 'list',
  name: i18n('List container', 'widget'),
  type: 'list',
  widgetType: 'list',
  events: {
    createBlock: (variant?: string) => {
      if (variant) {
        const variantDef = getWidgetVariant('list', variant);
        if (variantDef && variantDef.getDefaultData) {
          return variantDef.getDefaultData();
        }
      }
      return {
        data: { settings: { general: { padding: 10 } } },
        type: 'list',
        children: [],
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Direction',
      identifier: 'list-direction',
      property: '.direction',
      category: 'style',
      styleTags: ['core'],
      settingComponent: 'button-group',
      parameters: {
        options: [
          { text: 'Vertical', value: 'vertical' },
          { text: 'Horizontal', value: 'horizontal' },
        ],
      },
    },
    {
      name: 'Item gap',
      identifier: 'list-item-gap',
      property: '.itemGap',
      category: 'style',
      styleTags: ['core'],
      settingComponent: 'range',
      parameters: { min: 0, max: 100 },
    },
  ],
};

export default listWidget;
