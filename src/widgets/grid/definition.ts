import { nanoid } from 'nanoid';

import { dmeConfig } from '../../core';
import type { DME, DMEData } from '../../core';
import { EntityGrid } from './entity';

const gridWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'layout',
  icon: 'grid',
  name: 'Grid',
  type: 'grid',
  allowedTypes: '^(?!.*grid).*$',
  events: {
    createBlock: (): DMEData.Block<EntityGrid> => {
      const defaultStyle = dmeConfig.widgets['grid']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      return {
        id: nanoid(),
        type: 'grid',
        ...styleObj,
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