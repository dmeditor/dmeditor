import { nanoid } from 'nanoid';

import { dmeConfig } from '../..';
import type { DME, DMEData } from '../..';
import { EntityTableBlock, initialTableEntity } from './entity';

const HeadingWidget: DME.Widget = {
  category: 'widget',
  icon: 'table',
  name: 'Table',
  type: 'table',
  events: {
    createBlock: (): DMEData.Block<EntityTableBlock> => {
      const defaultStyle = dmeConfig.widgets['table']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      const { value } = initialTableEntity();

      return {
        id: nanoid(),
        type: 'table',
        ...styleObj,
        data: {
          value,
          settings: {
            borderType: 'border',
            borderColor: '#ccc',
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
      custom: true,
      property: 'settings.borderType',
    },
    {
      name: 'Padding',
      settingComponent: 'range',
      property: 'settings.padding',
      parameters: { min: 0, max: 40 },
    },
    {
      name: 'Border Color',
      settingComponent: 'color',
      property: 'settings.borderColor',
    },
    {
      name: 'Odd row background',
      settingComponent: 'color',
      property: 'settings.oddRowBackground',
    },
    {
      name: 'Row',
      settingComponent: 'table-row',
      custom: true,
    },
    {
      name: 'Column',
      settingComponent: 'table-column',
      custom: true,
    },
    {
      name: 'Table Header',
      settingComponent: 'table-header',
      custom: true,
    },
  ],
};

export default HeadingWidget;
