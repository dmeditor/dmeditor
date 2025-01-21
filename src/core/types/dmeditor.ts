import { ComponentType } from 'react';

import { Display, Mode, PageSettingType } from '../constants';

export namespace DME {
  //Note Returned value will be dependencyValue for other widgets.
  export type ServerSideLoadFunction<T = any> = (
    data: DMEData.Block<T>,
    context: { query: Record<string, string | number>; dependencyValue?: any } & Record<
      string,
      any
    >,
  ) => Promise<void | { value?: any }>;

  export interface Setting {
    property?: string;
    name: string;
    custom?: boolean; // If true, it will not invoke directly but use name->value layout.
    settingComponent: string; // Registered setting component, e.g., 'color' or 'align'.
    description?: string;
    styleTags?: string[]; // e.g., core, general
    category?: string;
    group?: string;
    display?: {
      labelFullWidth?: boolean;
      upDown?: boolean;
    };
    parameters?: { updateOnUnfocus?: boolean } & Record<string, unknown>;
  }

  export type Device = 'pc' | 'tablet' | 'mobile';
  // export type Mode = 'edit' | 'view';
  export type Mode = keyof typeof Mode;

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
    parameters?: Record<string, any>;
  };

  export type PageTheme = {
    identifier: string;
    name: string;
    cssStyle: string;
    config?: unknown;
  };

  export interface EmbedChildContext {
    relativePath: (number | string)[];
    blockData: DMEData.Block;
  }

  export interface Widget {
    type: string;
    name: string;
    icon: string | (() => unknown); // Base64 (e.g., png/svg), URL, or component.
    category: string;
    alias?: string;
    widgetType?: 'widget' | 'mixed' | 'list';
    enabledStyles?: string[];
    isBaseWidget?: boolean; // True if it's a base widget used for variants.
    allowedTypes?: string[] | string; // Allowed types for direct children.
    canDependentOn?: string[];
    events: {
      updateData?: (settings: Setting, data: DMEData.Block) => void;
      createBlock: () => DMEData.CreatedBlock<any, any>;
      embedConfig?: {
        enabledSettings?: (
          settings: Setting[],
          styles: Record<string, string[]>,
          context: EmbedChildContext,
        ) => { settings: Setting[]; enabledStyles?: Record<string, string[]> };
        hasOwnView?: (context: EmbedChildContext) => boolean;
      };
      defaultBlock?: () => DMEData.Block<any>;
      validate?: (data: any) => boolean;
    };
    settings: Setting[];
  }

  export interface WidgetVariant {
    widget: string; // Widget which is based on.
    identifier: string;
    name: string;
    cssStyle?: string; // Built-in style for the variant.
    category: string;
    enabledStyles?: string[];
    enabledSettings?: string[];
    allowedTypes?: string[]; // Can be sub widget inside.
    isInternal?: boolean; // Internal variant will only be used inside another widget.
    getDefaultData?: () => DMEData.Block<unknown>;
  }

  export interface WidgetStyle {
    identifier: string; // '_' for root.
    display?: Display; // Dropdown is default if not set.
    name: string; // 'Style' if not set.
    options: WidgetStyleOption[];
  }

  export interface WidgetImplementation {
    render: ComponentType<any>;
    preview?: ComponentType<{ blockData: any; mode?: 'list' }>;
    onServerSideLoad?: ServerSideLoadFunction;
    onDependencyValueChange?: (value: any, from: { id: string; widget: string }) => void;
  }

  export type WidgetStyleClasses = Record<string, string>;

  export type WidgetStyleSettingStatus = 'valid' | 'disabled' | 'hidden';

  export interface WidgetStyleOptionSettings {
    [key: string]: { value: any; status?: WidgetStyleSettingStatus };
  }

  export interface WidgetStyleOption {
    identifier: string;
    name: string;
    icon?: string;
    cssClasses?: WidgetStyleClasses;
    cssStyle: string; // CSS style using CSS-in-JS.
    settings?: WidgetStyleOptionSettings;
  }

  // export interface Block extends Widget {}

  export interface WidgetRenderProps<
    Type = DMEData.DefaultDataType,
    ChildrenType = DMEData.DefaultBlockType[],
  > {
    blockNode: DMEData.Block<Type, ChildrenType>;
    rootClasses: string;
    styleClasses: Record<string, string>;
    active: boolean;
    mode: Mode;
    path: (number | string)[];
    dependencyData?: any;
  }

  export interface SettingComponentProps<T = unknown> extends Setting {
    value?: unknown; // If custom is true, value will not be set.
    block: DMEData.Block<T>;
    blockPath: number[] | string[];
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
      | any[];
  }

  export interface Page {
    title: string;
    theme?: string;
    [index: string]: string | boolean | undefined;
  }

  export interface DependencyData {
    id: string;
    type: string;
  }

  export type DataSourceFixedData = Record<string, string | number>;

  export interface DataSourceData {
    type: 'fixed' | 'dependency' | 'variable';
    sourceData: string[] | DependencyData | DataSourceFixedData;
  }

  export interface SavedData {
    data: Block[];
    page: Page;
  }

  interface BlockBaseType {
    type: string;
    id?: string;
    style?: Record<string, string>;
    isEmbed?: boolean;
    serverData?: boolean; // Only set by server.
    allowedTypes?: string[]; // Used for list/grid/mixed-widget.
    editControl?: number; // Edit control levels.
    dependency?: { id: string; type: string }; //id of block which it depends on
  }

  export interface DefaultBlockType extends BlockBaseType {
    id: string;
    data: DefaultDataType; // Entity data from widget.
    children?: DefaultBlockType[];
  }

  export interface BlockWithChildren {
    children?: Block[];
  }

  //childrenType: can be DefaultBlockType[] or BlockWithChildren[] or object eg.{hero: Block, text: BlockList}
  export interface Block<Data = DefaultDataType, ChildrenType = DefaultBlockType[]>
    extends BlockBaseType {
    data: Data; // Entity data from widget.
    children?: ChildrenType;
    id: string;
  }

  export type CreatedBlock<Data = DefaultDataType, ChildrenType = DefaultBlockType[]> = Omit<
    Block<Data, ChildrenType>,
    'id'
  >;

  export type BlockList = Block[];

  export type BlockMap = Record<string, Block>;

  export interface GeneralSettingType {
    identifier?: string;
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    marginTop?: number;
    padding?: number | number[];
    fullWidth?: boolean;
    fullWidthContent?: boolean;
    blockBackground?: string | { color?: string; image?: string; imagePosition?: string };
    background?: string | { color?: string; image?: string; imagePosition?: string };
  }
}
