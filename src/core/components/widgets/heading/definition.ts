// import { widgetMetaData } from 'Components/types';

import { EntityHeadingBlock } from './entity';
import type { DMEData, DMEditor } from 'Core/types';
import { generateCommonBlockData } from 'Src/core/utils/utilx';

//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: DMEditor.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'TextFormatOutlined',
  name: 'Heading',
  type: 'heading',
  events: {
    createBlock: (): EntityHeadingBlock => {
      return {
        value: 'This is a new block',
        level: 2,
        settings: {
          align: 'left',
          color: '#000000',
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Level',
      settingType: 'range',
      category: 'settings',
      property: '.level',
      parameters: { min: 1, max: 5 },
    },
    { name: 'Align', settingType: 'align', category: 'settings', property: 'settings.align' },
    {
      name: 'Background',
      settingType: 'color',
      category: 'block',
      property: 'settings.background-color',
    },
    { name: 'Text color', settingType: 'color', category: 'settings', property: 'settings.color' },
    { name: 'Border', settingType: 'color', category: 'block', property: 'settings.border' },
    { name: 'Padding', settingType: 'range', category: 'block', property: 'settings.padding' },
    { name: 'Margin', settingType: 'range', category: 'block', property: 'settings.margin' },

    { name: '', settingType: 'heading', category: 'settings', custom: true, property: '' },
    // {name: 'Text', component: 'input', property: 'value'}
  ],
};

export default HeadingWidget;
