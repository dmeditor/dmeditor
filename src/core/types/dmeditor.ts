export namespace DME {
  interface Setting {
    property?: string;
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

  export type PageSetting = {
    identifier: string;
    name: string;
    type: 'text' | 'multitext';
  };

  export type PageTheme = {
    identifier: string;
    name: string;
    cssStyle: string;
    config?: unknown;
  };

  export interface Widget {
    type: string;
    name: string;
    icon: string | (() => unknown); //base 64(eg. png/svg) or url, or component
    category: 'widget' | 'container' | 'mixed' | 'layout' | 'section';
    alias?: string;
    enabledStyles?: Array<string>;
    isBaseWidget?: boolean; //true if it's base widget used for variants
    allowedTypes?: Array<string> | string; //allwed types for direct children
    events: {
      //   onInput: () => void 0,
      //   onChange: () => void 0,
      //   onFocus: () => void 0,
      //   onBlur: () => void 0,
      updateData?: (settings: Setting, data: DMEData.Block) => void;
      //when create an empty block
      createBlock: () => DMEData.Block<any, any>;

      //when used for default, eg. image inside another widget
      defaultBlock?: () => DMEData.Block<any>;

      //validate data
      validate?: (data: any) => boolean;
    };
    // style: {},
    settings: Array<Setting>;
  }

  export interface WidgetVariant {
    widget: string; //widget which is based on
    identifier: string;
    name: string;
    cssStyle?: string; //built-in style for the variant
    enabledStyles?: Array<string>;
    enabledSettings?: Array<string>;
    allowedTypes?: Array<string>; //can be sub widget inside
    isInternal?: boolean; // intenal variant will only used inside another widget.
    getDefaultData?: () => DMEData.Block<unknown>;
  }

  export interface WidgetStyle {
    identifier: string; // '_' for root
    display?: 'dropdown' | 'button-group' | 'radio' | 'inline-block'; //dropdown is default if not set.
    name: string; //'Style' if not set
    options: Array<WidgetStyleOption>;
  }

  //css classes, useful when using class names or class based framework(eg. tailwind).
  //key is for element - it's value is up to the widget, eg. for image text, {'root' - is for root, 'image' - image}
  export type WidgetStyleClasses = { [key: string]: string };

  export interface WidgetStyleOption {
    identifier: string;
    name: string;
    icon?: string;
    cssClasses?: WidgetStyleClasses;
    cssStyle: string; //css style using css-in-js
  }

  export interface Block extends Widget {}

  export interface WidgetRenderProps<Type = DMEData.DefaultDataType> {
    blockNode: DMEData.Block<Type>;
    rootClasses: string;
    // key is the setting item(eg. 'root', value is styles' class value, eg.['big-space', 'dark'])
    styleClasses: { [key: string]: string };
    active: boolean;
    mode: 'edit' | 'view';
    path: Array<number>;
  }

  export interface SettingComponentProps<T = unknown> extends Setting {
    value?: unknown; //if custom is true, value will be not set,
    block: DMEData.Block<T>;
  }

  export interface ImageInfo {
    src: string;
    description?: string;
    title?: string;
    thumbnail?: string;
    id?: string | number;
  }
}

export namespace DMEData {
  export interface DefaultDataType {
    settings?: {
      [index: string]: string | number;
    };
    [index: string]:
      | string
      | number
      | boolean
      | undefined
      | Record<string, string | boolean | number>
      | Array<any>;
  }

  export interface Page {
    title: string;
    theme?: string;
    [index: string]: string | undefined;
  }

  interface widgetBlockProperties {
    id?: string;
    type: string;
    style?: { [style: string]: string };
  }

  export interface DefaultBlockType extends widgetBlockProperties {
    data: DefaultDataType; //entity data from widget
    children?: Array<DefaultBlockType>;
  }

  export interface BlockNode {
    children?: Array<Block>;
  }

  //Block entity, which is a node in the data tree
  export interface Block<TData = DefaultDataType, TChild = DefaultBlockType>
    extends widgetBlockProperties {
    data: TData; //entity data from widget
    serverData?: boolean;
    children?: Array<TChild & BlockNode>;
  }

  //Block list
  export interface BlockList extends Array<Block> {}

  //A section is alias of a block
  // type Section = Block;
}
