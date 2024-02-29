import { nanoid } from 'nanoid';

import { EntityGrid } from './entity';
import { DMEData } from 'Core/types';
import { DME } from 'Src/core/types';

const gridWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'layout',
  icon: 'grid',
  name: 'Grid',
  type: 'grid',
  allowedTypes: '^(?!.*grid).*$',
  events: {
    createBlock: (): DMEData.Block<EntityGrid> => {
      return {
        id: nanoid(),
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
  ],
};

export default gridWidget;
