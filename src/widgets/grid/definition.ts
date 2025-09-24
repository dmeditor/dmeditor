import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import type { DME, DMEData } from '../..';
import { EntityGrid } from './entity';

const gridWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'design',
  icon: 'grid',
  name: i18n('Grid', 'widget'),
  type: 'grid',
  widgetType: 'list',
  allowedTypes: '^(?!.*grid).*$',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityGrid> => {
      return {
        type: 'grid',
        data: {
          columns: 3,
          mobileColumns: 2,
        },
        children: [],
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Columns',
      settingComponent: 'range',
      property: '.columns',
      parameters: { min: 1, max: 10 },
    },
    {
      name: 'Mobile columns',
      settingComponent: 'range',
      property: '.mobileColumns',
      parameters: { min: 1, max: 3 },
    },
    {
      name: 'Gap',
      settingComponent: 'range',
      property: '.gap',
      parameters: { min: 1, max: 50 },
    },
    {
      name: 'Items position',
      settingComponent: 'button-group',
      identifier: 'grid-item-position',
      property: 'settings.itemPosition',
      parameters: {
        options: [
          { text: 'Top', value: 'top' },
          { text: 'Middle', value: 'middle' },
          { text: 'Bottom', value: 'bottom' },
        ],
      },
      category: 'style',
    },
  ],
};

export default gridWidget;
