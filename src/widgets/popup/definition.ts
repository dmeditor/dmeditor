import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant } from '../..';
import { EntityPopup } from './entity';

export const popupDefinition: DME.Widget = {
  category: 'interactive',
  icon: 'popup',
  name: 'Pop up',
  type: 'popup',
  widgetType: 'widget',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityPopup> => {
      return {
        data: {
          buttonText: 'Button',
          modalSize: 'medium',
          settings: { general: { align: 'center', padding: 10 } },
        },
        type: 'popup',
        children: [
          { id: nanoid(), type: 'heading', data: { value: 'Heading', level: 2, settings: {} } },
        ],
      };
    },
  },
  settings: [
    {
      name: 'Button text',
      property: '.buttonText',
      styleTags: ['core'],
      settingComponent: 'input',
    },
    {
      name: 'Modal size',
      property: '.modalSize',
      styleTags: ['core'],
      settingComponent: 'button-group',
      parameters: {
        options: [
          { text: 'Small', value: 'small' },
          { text: 'Medium', value: 'medium' },
          { text: 'Large', value: 'large' },
        ],
      },
    },

    ...generalSettings,
  ],
};
