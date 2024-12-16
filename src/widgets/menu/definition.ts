import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant } from '../..';
import { EntityMenu } from './enitity';

export const menuDefinition: DME.Widget = {
  category: 'design',
  icon: 'menu',
  name: 'Menu',
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
      description: 'The parameter key in location query. eg. in ?menu=xxx where id is the key.',
      parameters: {
        updateOnUnfocus: true,
      },
    },
    ...generalSettings,
  ],
};
