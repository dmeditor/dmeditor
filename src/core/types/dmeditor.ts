import { ComponentType } from 'react';

import { Category, Display, Mode, PageSettingType } from '../enum';

export type ServerSideLoadFunction = (data: DMEData.Block, serverParameters: any) => Promise<void>;

export namespace DME {
  export interface Setting {
    property?: string;
    name: string;
    custom?: boolean; //if true it will not invoke directly instead of use name->value(left/right) layout.
    settingComponent: string; //registered setting component, eg. 'color', or 'align',
    styleTags?: Array<string>; //eg. core, general
    category?: string;
    group?: string;
    display?: {
      upDown?: boolean;
    };
    parameters?: {
      [key: string]: unknown;
    };
    //category:string
    // [key: string]: string|number
  }

  export type Device = 'pc' | 'tablet' | 'mobile';
  export type Mode = 'edit' | 'view';

  export interface ColorConfig {
    color: string;
    name?: string;
  }

  export interface WidgetCategory {
    identifier: string;
    name: string;
  }

  export type PageSetting = {
    identifier: string;
    name: string;
    type: PageSettingType;
  };

  export type PageTheme = {
    identifier: string;
    name: string;
    cssStyle: string;
    config?: unknown;
  };

  export interface EmbedChildContext {
    relativePath: Array<number>;
    blockData: DMEData.Block;
  }

  export interface Widget {
    type: string;
    name: string;
    icon: string | (() => unknown); // base 64(eg. png/svg) or url, or component
    category: string;
    alias?: string;
    widgetType?: 'widget' | 'mixed' | 'list';
    // availableIn?: string; //conext for using this widget, eg. a widget identifier, no context meaning it's for all.
    enabledStyles?: Array<string>;
    isBaseWidget?: boolean; //true if it's base widget used for variants
    allowedTypes?: Array<string> | string; //allwed types for direct children
    events: {
      // onInput: () => void 0,
      // onChange: () => void 0,
      // onFocus: () => void 0,
      // onBlur: () => void 0,
      updateData?: (settings: Setting, data: DMEData.Block) => void;
      //when create an empty block
      createBlock: () => DMEData.CreatedBlock<any, any>;

      embedConfig?: {
        enabledSettings?: (
          settings: Array<Setting>,
          styles: { [key: string]: Array<string> },
          context: EmbedChildContext,
        ) => { settings: Array<Setting>; enabledStyles?: { [key: string]: Array<string> } };

        hasOwnView?: (context: EmbedChildContext) => boolean;
      };

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
    category: string;
    enabledStyles?: Array<string>;
    enabledSettings?: Array<string>;
    allowedTypes?: Array<string>; //can be sub widget inside
    isInternal?: boolean; // intenal variant will only used inside another widget.
    getDefaultData?: () => DMEData.Block<unknown>;
  }

  export interface WidgetStyle {
    identifier: string; // '_' for root
    display?: Display; //dropdown is default if not set.
    name: string; //'Style' if not set
    options: Array<WidgetStyleOption>;
  }

  export interface WidgetImplemenation {
    render: ComponentType<any>;
    preview?: ComponentType<{ blockData: any; mode?: 'list' }>;
    onServerSideLoad?: ServerSideLoadFunction;
  }

  //css classes, useful when using class names or class based framework(eg. tailwind).
  //key is for element - it's value is up to the widget, eg. for image text, {'root' - is for root, 'image' - image}
  export type WidgetStyleClasses = { [key: string]: string };

  export type WidgetStyleSettingStatus = 'valid' | 'disabled' | 'hidden';

  export interface WidgetStyleOptionSettings {
    //eg. {setting.general.marginTop: {value: 10, enabled:true}}
    [key: string]: { value: any | undefined; status?: WidgetStyleSettingStatus };
  }

  export interface WidgetStyleOption {
    identifier: string;
    name: string;
    icon?: string;
    cssClasses?: WidgetStyleClasses;
    cssStyle: string; //css style using css-in-js
    settings?: WidgetStyleOptionSettings;
  }

  export interface Block extends Widget {}

  export interface WidgetRenderProps<Type = DMEData.DefaultDataType> {
    blockNode: DMEData.Block<Type>;
    rootClasses: string;
    // key is the setting item(eg. 'root', value is styles' class value, eg.['big-space', 'dark'])
    styleClasses: { [key: string]: string };
    active: boolean;
    mode: Mode;
    path: Array<number>;
  }

  export interface SettingComponentProps<T = unknown> extends Setting {
    value?: unknown; //if custom is true, value will be not set,
    block: DMEData.Block<T>;
    blockPath: Array<number>;
    disabled?: boolean;
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
    } & { general?: GeneralSettingType };
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

  export interface SavedData {
    data: Array<Block>;
    page: Page;
  }

  interface widgetBlockProperties {
    id?: string;
    type: string;
    style?: { [style: string]: string };
    isEmbed?: boolean;
    serverData?: boolean; // only set by server
    allowedTypes?: Array<string>; // used for list/grid/mixed-widget

    /* editControl: edit, delete
     1 - no limit(same as undefined),0 - view only, 2 - can edit but can not delete,
     >=10 is defined by widgets:
     10 for container: can not add/delete but can edit child(unless there is override)
    */
    editControl?: number;
  }

  export interface DefaultBlockType extends widgetBlockProperties {
    id: string;
    data: DefaultDataType; //entity data from widget
    children?: Array<DefaultBlockType>;
  }

  export interface BlockNode {
    children?: Array<Block>;
  }

  //Block entity, which is a node in the data tree
  export interface CreatedBlock<TData = DefaultDataType, TChild = DefaultBlockType>
    extends widgetBlockProperties {
    data: TData; //entity data from widget
    children?: Array<TChild & BlockNode>;
  }

  //Block entity, which is a node in the data tree
  export interface Block<TData = DefaultDataType, TChild = DefaultBlockType>
    extends CreatedBlock<TData, TChild> {
    id: string;
  }

  //Block list
  export type BlockList = Array<Block>;

  //A section is alias of a block
  // type Section = Block;

  export interface GeneralSettingType {
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    marginTop?: number;
    padding?: number | number[];
    fullWidth?: boolean;
    blockBackground?: string | { color?: string; image?: string; imagePostion?: string };
    background?: string | { color?: string; image?: string; imagePostion?: string };
  }
}
