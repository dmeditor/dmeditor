import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant, i18n } from '../..';
import { EntityLine } from './entity';

const lineWidget: DME.Widget = {
  category: 'design',
  icon: 'line',
  name: i18n('Line', 'widget'),
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
      parameters: {
        colorGroup: 'background',
      },
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
