import { Widget } from './blocktype';
import type { ReactElement } from 'react';

import type { BlockData } from 'Src/ToolDefinition';

export interface RenderMainProps {
  data: BlockData;
  isActive: boolean;
  onChange?: (data: any) => void;
  onUpdateProperty?: (data: any) => void;
}

export interface RenderSettingProps {
  data: BlockData;
  onSetting: any;
  params?: any;
}

export interface BlockTypeMenu {
  text: string;
  category: string;
  icon: ReactElement;
}

export interface BlockHandler {
  type: string;
  menu: BlockTypeMenu;
  canSelectElement?: boolean;
  getDefaultData: () => BlockData; //when block type is selected
  renderMain: React.FC<RenderMainProps>;
  renderSetting: React.FC<RenderSettingProps>;
}

export interface BlockLayoutData {
  padding?: number;
  marginTop?: number;
  backgroundColor?: string;
}

export interface WidgetSettings{
  [key: string]: string|number
}

export interface Widget{
  type: string,
  name: string,
  icon: string, //base 64(eg. png/svg) or url
  category: 'widget'|'layout',
  alias?: string
  events:{
  //   onInput: () => void 0,
  //   onChange: () => void 0,
  //   onFocus: () => void 0,
  //   onBlur: () => void 0,      
    updateData:(settings:WidgetSettings, data: DMEData.Block)=>void,
    //when create an emtpy block
    createBlock:()=>DMEData.BlockData,

    //validate data
    validate?:(data:any)=>boolean
  },
  // style: {},  
  settings: WidgetSettings
}


export namespace DMEditor {
  export interface Widget {}
  export interface Block extends Widget {}
}

export namespace DMEData{ 

export interface BlockData{

}

export interface BlockStyle{

}

//Block entity, which is a node in the data tree
export interface Block {
  id?: string,
  type: string, //can use type for internal
  parent?: Block,
  data: BlockData,
  style?:BlockStyle,
  children?: Array<Block>,
}

//Block list
export interface BlockList extends Array<BlockData>{}

//A section is alias of a block
type Section= Block;
}