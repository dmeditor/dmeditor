import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant } from '../..';
import { EntityLine } from './entity';

const lineWidget: DME.Widget = {
  category: 'design',
  icon: 'line',
  name: 'Line',
  type: 'line',
  events: {
    createBlock: (variant?: string): DMEData.CreatedBlock<EntityLine> => {
      return {
        data: {
          settings: {
            height: 1,
            color: '#999999',
            general: { padding: 10 },
          },
        },
        type: 'line',
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Line color',
      property: 'settings.color',
      settingComponent: 'color',
    },
    {
      name: 'Line height',
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
        'settings.general.padding',
        'settings.general.fullWidth',
      ].includes(item.property || ''),
    ),
  ],
};

export default lineWidget;
