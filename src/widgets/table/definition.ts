import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import type { DME, DMEData } from '../..';
import { EntityTableBlock, initialTableEntity } from './entity';

const HeadingWidget: DME.Widget = {
  category: 'basic',
  icon: 'table',
  get name() {
    return i18n('Table', 'widget');
  },
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
      get name() { return i18n('Row', 'property-label'); },
      settingComponent: 'table-row',
      custom: true,
    },
    {
      get name() { return i18n('Column', 'property-label'); },
      settingComponent: 'table-column',
      custom: true,
    },
    {
      get name() { return i18n('Cell padding', 'property-label'); },
      identifier: 'table-cell-padding',
      settingComponent: 'range',
      property: 'settings.padding',
      parameters: { min: 0, max: 40 },
      category: 'style',
    },
    {
      get name() { return i18n('Text color', 'property-label'); },
      identifier: 'table-text-color',
      settingComponent: 'color',
      parameters: {
        colorGroup: 'text',
      },
      property: 'settings.color',
      category: 'style',
    },
    {
      get name() { return i18n('Border type', 'property-label'); },
      identifier: 'table-border-type',
      settingComponent: 'table-border-type',
      group: 'style_border',
      property: 'settings.borderType',
      category: 'style',
    },
    {
      get name() { return i18n('Border color', 'property-label'); },
      identifier: 'table-border-color',
      settingComponent: 'color',
      group: 'style_border',
      property: 'settings.borderColor',
      parameters: {
        colorGroup: 'border',
      },
      category: 'style',
    },
    {
      get name() { return i18n('Odd row background', 'property-label'); },
      identifier: 'table-odd-row-background',
      settingComponent: 'color',
      parameters: {
        colorGroup: 'background',
      },
      property: 'settings.oddRowBackground',
      category: 'style',
    },
    {
      get name() { return i18n('Table header', 'property-label'); },
      identifier: 'table-header',
      settingComponent: 'table-header',
      custom: true,
      category: 'style',
    },
  ],
};

export default HeadingWidget;
