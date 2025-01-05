import { dmeConfig, generalSettings, i18n } from '../..';
import type { DME, DMEData } from '../..';
import { EntityTableBlock, initialTableEntity } from './entity';

const HeadingWidget: DME.Widget = {
  category: 'basic',
  icon: 'table',
  name: i18n('Table', 'widget'),
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
            general: { padding: 10, width: '100%' },
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
      parameters: {
        colorGroup: 'text',
      },
      property: 'settings.color',
      category: 'style',
    },
    {
      name: 'Border type',
      settingComponent: 'table-border-type',
      group: 'style_border',
      property: 'settings.borderType',
      category: 'style',
    },
    {
      name: 'Border Color',
      settingComponent: 'color',
      group: 'style_border',
      property: 'settings.borderColor',
      parameters: {
        colorGroup: 'border',
      },
      category: 'style',
    },
    {
      name: 'Odd row background',
      settingComponent: 'color',
      parameters: {
        colorGroup: 'background',
      },
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
