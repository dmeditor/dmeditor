// import { widgetMetaData } from 'Components/types';

import { DMEData, Widget, WidgetSettings } from "../../types/blocktype";
import { EntityHeadingBlock } from "./entity";


//should be HeadingWidget, which is a definition object. This file should be called definitin.ts
//todo: define a type for this.
const HeadingWidget: Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'TextFormatOutlined',
  name: 'Heading',
  type: 'heading',  
  events:{
    updateData:(settings:WidgetSettings, block:DMEData.Block)=>{},
    createBlock:():EntityHeadingBlock=>{
      return {
        value: 'This is a new block',
        type: 'heading',
        level: 2,
        settings:{
          align: 'left',
          color: '#000000',
        }
      };
    },
  },
  // data:{
  //   id: '',
  //   settings: {
  //     align: 'left',
  //     'background-color': '',
  //     color: '#000000',
  //     level: 2,
  //     'margin-top': 0,
  //     padding: 0,
  //     textColor: '#000000',
  //     width: 'auto',
  //   },
  //   value: '',
  //   level: 2,
  //   placeholder: '',
  // },
  settings: {
    align: 'left',
    value: '',
    'background-color': '',
    color: '#000000',
    level: 2,
    'margin-top': 0,
    padding: 0,
    textColor: '#000000',
    width: 'auto',
  }
};

export default HeadingWidget;
