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
  interface Setting {
    property: string;
    name: string;
    custom?: boolean; //if true it will not invoke directly instead of use name->value(left/right) layout.
    settingType: string; //registered setting component, eg. 'color', or 'align',
    category?: string;
    parameters?: {
      [key: string]: unknown;
    };
    //category:string
    // [key: string]: string|number
  }

  export interface Widget {
    type: string;
    name: string;
    icon: string; //base 64(eg. png/svg) or url
    category: 'widget' | 'layout';
    alias?: string;
    events: {
      //   onInput: () => void 0,
      //   onChange: () => void 0,
      //   onFocus: () => void 0,
      //   onBlur: () => void 0,
      updateData: (settings: Setting, data: DMEData.Block) => void;
      //when create an emtpy block
      createBlock: () => unknown;

      //validate data
      validate?: (data: any) => boolean;
    };
    // style: {},
    settings: Array<Setting>;
  }
  export interface Block extends Widget {}
}

export namespace DMEData {
  export interface BlockStyle {}

  //Block entity, which is a node in the data tree
  export interface Block {
    id?: string;
    type: string; //can use type for internal
    parent?: Block;
    data: {
      settings: unknown;
    }; //entity data from widget
    style?: BlockStyle;
    children?: Array<Block>;
  }

  //Block list
  export interface BlockList extends Array<Block> {}

  //A section is alias of a block
  type Section = Block;
}
