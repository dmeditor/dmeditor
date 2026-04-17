import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import { EntityHeadingBlock } from './entity';

//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'basic',
  icon: 'ic-heading',
  get name() {
    return i18n('Heading', 'widget');
  },
  type: 'heading',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityHeadingBlock> => {
      return {
        type: 'heading',
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
      get name() {
        return i18n('Text', 'property-label');
      },
      property: '.value',
      settingComponent: 'input',
    },
    {
      get name() {
        return i18n('Level', 'property-label');
      },
      settingComponent: 'range',
      property: '.level',
      parameters: { min: 1, max: 5 },
    },
    {
      get name() {
        return i18n('Text align', 'property-label');
      },
      settingComponent: 'align',
      property: 'settings.align',
      identifier: 'heading-align',
      category: 'style',
      styleTags: ['core'],
    },
    {
      get name() {
        return i18n('Text color', 'property-label');
      },
      identifier: 'heading-text-color',
      settingComponent: 'color',
      property: 'settings.color',
      parameters: {
        colorGroup: 'text',
      },
      category: 'style',
      styleTags: ['core'],
    },
    {
      get name() {
        return i18n('Anchor', 'property-label');
      },
      settingComponent: 'heading',
      property: '.anchor',
    },
  ],
};

export default HeadingWidget;
