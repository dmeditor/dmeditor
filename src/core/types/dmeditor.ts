export namespace DME {
  interface Setting {
    property: string;
    name: string;
    custom?: boolean; //if true it will not invoke directly instead of use name->value(left/right) layout.
    settingComponent: string; //registered setting component, eg. 'color', or 'align',
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
    category: 'widget' | 'layout' | 'section';
    alias?: string;
    events: {
      //   onInput: () => void 0,
      //   onChange: () => void 0,
      //   onFocus: () => void 0,
      //   onBlur: () => void 0,
      updateData: (settings: Setting, data: DMEData.Block) => void;
      //when create an emtpy block
      createBlock: () => unknown; //todo: use type instead of unknown

      //validate data
      validate?: (data: any) => boolean;
    };
    // style: {},
    settings: Array<Setting>;
  }

  export interface WidgetVariant{
    widget:string; //widget which is based on
    identifier: string;
    name: string;
    style?: string|{[props:string]:string};
    inlineStyle?: string;
    enabled_settings: Array<string>;
    allowed_widgets?: Array<string|unknown>; //can be sub widget inside
    defaultData?: unknown
  }
  
  export interface Block extends Widget {}

  export interface WidgetRenderProps<Type=DMEData.DefaultDataType>{
    blockNode: DMEData.Block<Type>,
    active:boolean,
    adding:boolean
  }

  export interface SettingComponentProps<T=unknown> extends Setting{
    value?:T //if custom is true, value will be not set
  }
}

export namespace DMEData {
  export interface BlockStyle {}

  export interface DefaultDataType{
      settings: {
        [index: string]: string | number;
      };
      [index: string]: string | number | Record<string, string | number>;
  }
  

  //Block entity, which is a node in the data tree
  export interface Block<TData=DefaultDataType> {
    id?: string;
    type: string; //can use type for internal
    parent?: Block;
    data: TData; //entity data from widget
    style?: BlockStyle;
    children?: Array<Block>;
  }

  //Block list
  export interface BlockList extends Array<Block> {}

  //A section is alias of a block
  // type Section = Block;
}