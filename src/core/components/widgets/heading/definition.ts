// import { widgetMetaData } from 'Components/types';

import { nanoid } from 'nanoid';

import { EntityHeadingBlock } from './entity';
import type { DME, DMEData } from 'Core/types/dmeditor';

//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'TextFormatOutlined',
  name: 'Heading',
  type: 'heading',
  themeStyles: 'Theme heading',
  events: {
    createBlock: (): DMEData.Block<EntityHeadingBlock> => {
      return {
        id: nanoid(),
        type: 'heading',
        data: {
          value: 'This is a new block',
          level: 2,
          settings: {
            align: 'left',
          },
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Text',
      property: '.value',
      category: 'settings',
      settingComponent: 'input',
    },
    {
      name: 'Level',
      settingComponent: 'range',
      category: 'settings',
      property: '.level',
      parameters: { min: 1, max: 5 },
    },
    { name: 'Align', settingComponent: 'align', category: 'settings', property: 'settings.align' },
    {
      name: 'Background',
      settingComponent: 'color',
      category: 'block',
      property: 'settings.background-color',
    },
    {
      name: 'Text color',
      settingComponent: 'color',
      category: 'settings',
      property: 'settings.color',
    },
    { name: 'Border', settingComponent: 'color', category: 'block', property: 'settings.border' },
    { name: 'Padding', settingComponent: 'range', category: 'block', property: 'settings.padding' },
    { name: 'Margin', settingComponent: 'range', category: 'block', property: 'settings.margin' },

    { name: '', settingComponent: 'heading', category: 'settings', custom: true, property: '' },
    // {name: 'Text', component: 'input', property: 'value'}
  ],
};

export default HeadingWidget;
