import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant } from '../..';
import { EntityContentView } from './entity';

export const contentViewDefinition: DME.Widget = {
  category: 'design',
  icon: 'content-view',
  name: 'Content view',
  type: 'content-view',
  widgetType: 'widget',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityContentView> => {
      return {
        type: 'content-view',
        data: {
          parameterKey: 'id',
          view: 'block',
        },
      };
    },
  },
  settings: [
    {
      name: 'Parameter to receive',
      settingComponent: 'input',
      property: '.parameterKey',
      description: 'The parameter key to receive from address. eg. in ?id=xxx where id is the key.',
    },
    {
      name: 'View',
      settingComponent: 'select',
      property: '.view',
      parameters: {
        optionsFrom: 'widgets/content-view/views',
      },
    },
    ...generalSettings,
  ],
};
