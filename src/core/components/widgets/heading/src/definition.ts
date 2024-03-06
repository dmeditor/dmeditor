// import { widgetMetaData } from 'dmeditor/components/types';

import type { DME, DMEData } from 'dmeditor/types/dmeditor';
import { nanoid } from 'nanoid';

import { EntityHeadingBlock } from './entity';

//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'ic-heading',
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
      settingComponent: 'input',
    },
    {
      name: 'Level',
      settingComponent: 'range',
      property: '.level',
      parameters: { min: 1, max: 5 },
    },
    { name: 'Align', settingComponent: 'align', property: 'settings.align' },
    {
      name: 'Text color',
      settingComponent: 'color',
      property: 'settings.color',
    },
    {
      name: 'Background',
      settingComponent: 'color',
      category: 'block',
      property: 'settings.background-color',
    },
    { name: 'Padding', settingComponent: 'range', category: 'block', property: 'settings.padding' },
    { name: 'Margin', settingComponent: 'range', category: 'block', property: 'settings.margin' },
    { name: '', settingComponent: 'heading', custom: true, property: '' },
  ],
};

export default HeadingWidget;
