import { dmeConfig, generalSettings } from '../..';
import type { DME, DMEData } from '../..';
import { EntityGrid } from './entity';

const gridWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'design',
  icon: 'grid',
  name: 'Grid',
  type: 'grid',
  allowedTypes: '^(?!.*grid).*$',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityGrid> => {
      return {
        type: 'grid',
        data: {
          columns: 3,
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
      parameters: { min: 1, max: 5 },
    },
    ...generalSettings,
  ],
};

export default gridWidget;
