import { ComponentType } from 'react';

import { Display, PageSettingType } from '../enum';

export type ServerSideLoadFunction = (data: DMEData.Block, serverParameters: any) => Promise<void>;

export namespace DME {
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
      upDown?: boolean;
    };
    parameters?: Record<string, unknown>;
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
    relativePath: number[];
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

  export interface WidgetRenderProps<Type = DMEData.DefaultDataType, Node = unknown> {
    blockNode: DMEData.Block<Type, Node>;
    rootClasses: string;
    styleClasses: Record<string, string>;
    active: boolean;
    mode: Mode;
    path: number[];
  }

  export interface SettingComponentProps<T = unknown> extends Setting {
    value?: unknown; // If custom is true, value will not be set.
    block: DMEData.Block<T>;
    blockPath: number[];
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
    [index: string]: string | undefined;
  }

  export interface SavedData {
    data: Block[];
    page: Page;
  }

  interface WidgetBlockProperties {
    id?: string;
    type: string;
    style?: Record<string, string>;
    isEmbed?: boolean;
    serverData?: boolean; // Only set by server.
    allowedTypes?: string[]; // Used for list/grid/mixed-widget.
    editControl?: number; // Edit control levels.
  }

  export interface DefaultBlockType extends WidgetBlockProperties {
    id: string;
    data: DefaultDataType; // Entity data from widget.
    children?: DefaultBlockType[];
  }

  export interface BlockNode {
    children?: Block[];
  }

  export interface CreatedBlock<Data = DefaultDataType, Child = DefaultBlockType>
    extends WidgetBlockProperties {
    data: Data; // Entity data from widget.
    children?: (BlockNode & Child)[];
  }

  export interface Block<Data = DefaultDataType, Child = DefaultBlockType>
    extends CreatedBlock<Data, Child> {
    id: string;
  }

  export type BlockList = Block[];

  export interface GeneralSettingType {
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    marginTop?: number;
    padding?: number | number[];
    fullWidth?: boolean;
    blockBackground?: string | { color?: string; image?: string; imagePosition?: string };
    background?: string | { color?: string; image?: string; imagePosition?: string };
  }
}
