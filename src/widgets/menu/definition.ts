import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant, i18n } from '../..';
import { EntityMenu } from './enitity';

export const menuDefinition: DME.Widget = {
  category: 'design',
  icon: 'menu',
  name: i18n('Section menu', 'widget'),
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
      name: 'Block Identifier',
      settingComponent: 'input',
      description: 'The key location query. eg. in ?menu=xxx where menu is the key.',
      parameters: {
        updateOnUnfocus: true,
      },
    },
    {
      property: 'settings.direction',
      name: 'Direction',
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
      name: 'Text color',
      property: 'settings.color',
      settingComponent: 'color',
      parameters: {
        colorGroup: 'text',
      },
      category: 'style',
    },
    ...generalSettings,
  ],
};
