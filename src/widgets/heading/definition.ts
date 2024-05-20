import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig } from '../..';
import { generalSettings } from '../../core/setting-panel/property-setting';
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
      const defaultStyle = dmeConfig.widgets['button']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      return {
        id: nanoid(),
        type: 'heading',
        ...styleObj,
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
      property: 'settings.backgroundColor',
    },
    {
      name: 'Margin',
      settingComponent: 'range',
      parameters: { min: 0, max: 200 },
      category: 'block',
      property: 'settings.marginTop',
    },
    { name: '', settingComponent: 'heading', custom: true, property: '' },
    ...generalSettings,
  ],
};

export default HeadingWidget;
