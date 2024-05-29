import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings } from '../..';
import { EntityHeadingBlock } from './entity';

//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'basic',
  icon: 'ic-heading',
  name: 'Heading',
  type: 'heading',
  themeStyles: 'Theme heading',
  events: {
    createBlock: (): DMEData.Block<EntityHeadingBlock> => {
      const defaultStyle = dmeConfig.widgets['button']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      return {
        id: nanoid(),
        type: 'heading',
        ...styleObj,
        data: {
          value: 'This is a new block',
          level: 2,
          settings: {},
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
    {
      name: 'Text align',
      settingComponent: 'align',
      property: 'settings.align',
      category: 'block',
      styleTags: ['core'],
    },
    {
      name: 'Text color',
      settingComponent: 'color',
      property: 'settings.color',
      category: 'block',
      styleTags: ['core'],
    },
    { name: '', settingComponent: 'heading', custom: true, property: '' },
    ...generalSettings,
  ],
};

export default HeadingWidget;
