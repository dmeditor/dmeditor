import type { DME } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, getWidgetVariant, i18n } from '../..';

const listWidget: DME.Widget = {
  category: 'design',
  icon: 'list',
  get name() {
    return i18n('List container', 'widget');
  },
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
      get name() { return i18n('Direction', 'property-label'); },
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
      get name() { return i18n('Item gap', 'property-label'); },
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
