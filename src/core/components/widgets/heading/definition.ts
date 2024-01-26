// import { widgetMetaData } from 'Components/types';

import { DMEData, Widget, WidgetSettings } from '../../types/blocktype';
import { EntityHeadingBlock } from './entity';
import { generateCommonBlockData } from 'Src/core/utils/utilx';

//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'TextFormatOutlined',
  name: 'Heading',
  type: 'heading',
  events: {
    updateData: (settings: WidgetSettings, block: DMEData.Block) => {},
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
  },
  settings: [
    { name: 'Level', settingType: 'range', category:'settings', property: 'level', parameters: { min: 1, max: 5 } },
    { name: 'Align', settingType: 'align', category:'settings', property: 'setting.align' },
    { name: 'Background', settingType: 'color', category:'block', property: 'setting.background-color'},    
    { name: 'Text color', settingType: 'color', category:'settings',  property: 'setting.color' },
    { name: 'Border', settingType: 'color', category:'block', property: 'setting.padding'},
    { name: 'Padding', settingType: 'range', category:'block', property: 'setting.padding'},    
    { name: 'Margin', settingType: 'range', category:'block', property: 'setting.padding'},
      
    
    { name: '', settingType: 'heading', category:'settings', custom: true, property: '' },
    // {name: 'Text', component: 'input', property: 'value'}
  ],
};

export default HeadingWidget;