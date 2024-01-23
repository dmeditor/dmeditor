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
    { name: 'Level', settingType: 'range', property: 'level', parameters: { min: 1, max: 5 } },
    { name: 'Align', settingType: 'align', property: 'setting.align' },
    { name: 'Background', settingType: 'color', property: 'setting.background-color' },
    { name: 'Color', settingType: 'color', property: 'setting.color' },
    { name: '', settingType: 'heading', custom: true, property: '' },
    // {name: 'Text', component: 'input', property: 'value'}
  ],
};

export default HeadingWidget;