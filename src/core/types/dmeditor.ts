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
      createBlock: () => DMEData.Block<any>;

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
    style?: string|{[props:string]:string}; //style, eg. 'large-space', or {space: 'large', border: 'top'}
    cssStyle?: string; //built-in style for the variant
    availableStyles?:Array<string>;
    enabled_settings: Array<string>;
    allowed_widgets?: Array<string|unknown>; //can be sub widget inside
    getDefaultData?: ()=> DMEData.Block<unknown>
  }

  export interface WidgetStyle{
    identifier: string, // '_' if not set
    display?: 'dropdown'|'button-group'|'radio' | 'inline-block', //dropdown is default if not set.
    name: string //'Style' if not set
    options: Array<WidgetStyleOption>
  }

  export interface WidgetStyleOption{
    identifier: string,
    name: string,
    icon: string,
    cssStyle: string //css style using css-in-js
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
    style?: {[style:string]:string};
    children?: Array<Block>;
  }

  //Block list
  export interface BlockList extends Array<Block> {}

  //A section is alias of a block
  // type Section = Block;
}