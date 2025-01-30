import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import { EntityHeadingBlock } from './entity';

//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'basic',
  icon: 'ic-heading',
  name: i18n('Heading', 'widget'),
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
      identifier: 'heading-align',
      category: 'style',
      styleTags: ['core'],
    },
    {
      name: 'Text color',
      identifier: 'heading-text-color',
      settingComponent: 'color',
      property: 'settings.color',
      parameters: {
        colorGroup: 'text',
      },
      category: 'style',
      styleTags: ['core'],
    },
    { name: 'Anchor', settingComponent: 'heading', property: '.anchor' },
    ...getCommonSettings('none', [
      'content-width',
      'content-self-align',
      'container-padding',
      'container-margin-top',
      'container-background-color',
      'container-full-width',
      'container-full-width-content',
    ]),
  ],
};

export default HeadingWidget;
