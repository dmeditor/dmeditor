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

export namespace DMEditor {
  export interface Widget {}
  export interface Block extends Widget {}
}


export namespace DMEData{ 
//Block entity, which is a node in the data tree
export interface Block {
  id: string,
  type: string, //can use type for internal
  parent?: Block,
  children?: Array<Block>,
}

//Block list
export interface BlockList extends Array<Block>{}

//A section is alias of a block
type Section= Block;
}