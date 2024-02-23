import { nanoid } from 'nanoid';

import { EntityTableBlock } from './entity';
import type { DME, DMEData } from 'Core/index';

const HeadingWidget: DME.Widget = {
  category: 'widget',
  icon: 'GridOn',
  name: 'Table',
  type: 'table',
  events: {
    createBlock: (): DMEData.Block<EntityTableBlock> => {
      return {
        id: nanoid(),
        type: 'table',
        data: {
          value: [
            ['11', '22'],
            ['33', '44'],
          ],
          activeCellIndex: [0, 0],
          settings: {
            'border-type': 'border',
            'border-color': '#ccc',
          },
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'BorderType',
      settingComponent: 'table-border-type',
      category: 'settings',
      property: 'settings.border-type',
    },
    {
      name: 'Border Color',
      settingComponent: 'color',
      category: 'settings',
      property: 'settings.border-color',
    },
    {
      name: 'Odd row background',
      settingComponent: 'color',
      category: 'settings',
      property: 'settings.odd-row-background',
    },
    {
      name: 'Row',
      settingComponent: 'table-row',
      category: 'settings',
      property: 'settings.row',
    },
    {
      name: 'Column',
      settingComponent: 'table-column',
      category: 'settings',
      property: 'settings.column',
    },
    {
      name: 'Table Header',
      settingComponent: 'table-header',
      category: 'settings',
      custom: true,
      property: 'setting.has-header',
    },
  ],
};

export default HeadingWidget;
