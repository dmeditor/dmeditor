import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, getWidgetVariant, i18n } from '../..';
import { EntityMenu } from './enitity';

export const menuDefinition: DME.Widget = {
  category: 'design',
  icon: 'menu',
  get name() {
    return i18n('Section menu', 'widget');
  },
  type: 'menu',
  widgetType: 'widget',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityMenu> => {
      return {
        type: 'menu',
        data: {
          menuList: [
            { text: 'Menu1', identifier: 'menu1', value: '1' },
            { text: 'Menu2', identifier: 'menu2', value: '2' },
          ],
          settings: {
            direction: 'horizontal',
            general: { identifier: 'menu' },
          },
        },
      };
    },
  },
  settings: [
    {
      property: 'settings.general.identifier',
      get name() { return i18n('Block identifier', 'property-label'); },
      settingComponent: 'input',
      description: 'The key location query. eg. in ?menu=xxx where menu is the key.',
      parameters: {
        updateOnUnfocus: true,
      },
    },
    {
      property: 'settings.direction',
      get name() { return i18n('Direction', 'property-label'); },
      identifier: 'menu-direction',
      settingComponent: 'button-group',
      parameters: {
        options: [
          { value: 'horizontal', text: 'Horizontal' },
          { value: 'vertical', text: 'Vertical' },
        ],
      },
      category: 'style',
    },
    {
      get name() { return i18n('Text color', 'property-label'); },
      identifier: 'menu-text-color',
      property: 'settings.color',
      settingComponent: 'color',
      parameters: {
        colorGroup: 'text',
      },
      category: 'style',
    },
  ],
};
