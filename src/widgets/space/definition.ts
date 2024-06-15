import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant } from '../..';
import { EntitySpace } from './entity';

const spaceWidget: DME.Widget = {
  category: 'design',
  icon: 'button', //todo: change icon
  name: 'Space',
  type: 'space',
  events: {
    createBlock: (variant?: string): DMEData.Block<EntitySpace> => {
      return {
        id: nanoid(),
        data: {
          settings: {
            height: 5,
            general: {
              background: '#cccccc',
            },
          },
        },
        type: 'space',
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Height',
      property: 'settings.height',
      settingComponent: 'range',
      parameters: {
        min: 1,
        max: 100,
      },
    },
    ...generalSettings.filter((item) =>
      [
        'settings.general.background',
        'settings.general.marginTop',
        'settings.general.fullWidth',
      ].includes(item.property),
    ),
  ],
};

export default spaceWidget;
