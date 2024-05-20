import { nanoid } from 'nanoid';

import { dmeConfig } from '../..';
import type { DME, DMEData } from '../..';
import { generalSettings } from '../../core/setting-panel/property-setting';
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
            padding: 10,
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
      name: 'BorderType',
      settingComponent: 'table-border-type',
      custom: true,
      property: 'settings.borderType',
      category: 'block',
    },
    {
      name: 'Cell padding',
      settingComponent: 'range',
      property: 'settings.padding',
      parameters: { min: 0, max: 40 },
      category: 'block',
    },
    {
      name: 'Border Color',
      settingComponent: 'color',
      property: 'settings.borderColor',
      category: 'block',
    },
    {
      name: 'Odd row background',
      settingComponent: 'color',
      property: 'settings.oddRowBackground',
      category: 'block',
    },
    {
      name: 'Table Header',
      settingComponent: 'table-header',
      custom: true,
      category: 'block',
    },
    ...generalSettings,
  ],
};

export default HeadingWidget;
