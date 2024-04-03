import { dmeConfig } from 'dmeditor';
import MiniText from 'dmeditor/components/utility/mini-rich-text/MiniRichText';
import type { DME, DMEData } from 'dmeditor/index';
import { nanoid } from 'nanoid';

import { EntityTableBlock } from './entity';

const HeadingWidget: DME.Widget = {
  category: 'widget',
  icon: 'table',
  name: 'Table',
  type: 'table',
  events: {
    createBlock: (): DMEData.Block<EntityTableBlock> => {
      const defaultStyle = dmeConfig.widgets['table']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      return {
        id: nanoid(),
        type: 'table',
        ...styleObj,
        data: {
          value: [
            [MiniText, '22'],
            ['33', '44'],
          ],
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
