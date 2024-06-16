import { dmeConfig, generalSettings } from '../..';
import type { DME, DMEData } from '../..';
import { EntityTableBlock, initialTableEntity } from './entity';

const HeadingWidget: DME.Widget = {
  category: 'basic',
  icon: 'table',
  name: 'Table',
  type: 'table',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityTableBlock> => {
      const { value } = initialTableEntity();

      return {
        type: 'table',
        data: {
          value,
          settings: {
            padding: 10,
            borderType: 'border',
            borderColor: '#ccc',
            general: {
              align: 'center',
            },
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
      name: 'Cell padding',
      settingComponent: 'range',
      property: 'settings.padding',
      parameters: { min: 0, max: 40 },
      category: 'style',
    },
    {
      name: 'Text color',
      settingComponent: 'color',
      property: 'settings.color',
      category: 'style',
    },
    {
      name: 'BorderType',
      settingComponent: 'table-border-type',
      custom: true,
      group: 'style_border',
      property: 'settings.borderType',
      category: 'style',
    },
    {
      name: 'Border Color',
      settingComponent: 'color',
      group: 'style_border',
      property: 'settings.borderColor',
      category: 'style',
    },
    {
      name: 'Odd row background',
      settingComponent: 'color',
      property: 'settings.oddRowBackground',
      category: 'style',
    },
    {
      name: 'Table Header',
      settingComponent: 'table-header',
      custom: true,
      category: 'style',
    },
    ...generalSettings,
  ],
};

export default HeadingWidget;
