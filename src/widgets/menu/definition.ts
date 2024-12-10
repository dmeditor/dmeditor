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
          parameterKey: 'id',
          menuList: [
            { text: 'Menu1', identifier: 'menu1' },
            { text: 'Menu2', identifier: 'menu2' },
          ],
          settings: {},
        },
      };
    },
  },
  settings: [
    {
      property: '.parameterKey',
      name: 'Parameter to set',
      settingComponent: 'input',
      description: 'The parameter key in location query. eg. in ?id=xxx where id is the key.',
    },
    ...generalSettings,
  ],
};
