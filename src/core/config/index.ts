import { ComponentType } from 'react';

import type { DME, DMEData } from '../types';

export type BrowseLinkCallbackParams = { link: string; openNew?: boolean };

export type BrowseImageCallbackParams = DME.ImageInfo[];

export interface SavedBlockData {
  name: string;
  image?: string;
  savedData: {
    id?: string;
    type?: string;
    style?: { [style: string]: string };
    data: DMEData.DefaultDataType;
    children?: Array<DMEData.DefaultBlockType>;
  };
}

export interface CallbackConfig {
  browseImage?: ComponentType<{
    value: BrowseImageCallbackParams;
    onChange: (value: BrowseImageCallbackParams) => void;
    multiple?: boolean;
  }>;
  browseLink?: ComponentType<{
    value: BrowseLinkCallbackParams;
    onChange: (value: BrowseLinkCallbackParams) => void;
  }>;
  canEditControl?: (block: DMEData.Block) => boolean;
  getSavedBlocks?: (widget: string) => Array<SavedBlockData>;
}

export interface widgetConfig {
  allowedTypes?: Array<string>;
  [prop: string]: any;
}

export interface DataSourceConfigType {
  edit: React.FC<{
    widget: string;
    data?: Record<string, string | number>;
    isList?: boolean; //list or one
    view?: string; //eg. block
    onChange: (v: Record<string, string | number>) => void;
  }>;
  fetchInServer?: (
    widget: string,
    data: DMEData.DataSourceData,
    vars: Record<string, any>,
  ) => Promise<any>;
  fetchInClient?: (
    widget: string,
    data: DMEData.DataSourceData,
    values: { dependencyValue?: any },
  ) => Promise<any>;
}

export type AddingSettingsType = {
  allowedTypes: Array<string>;
  defaultStyle: { [widget: string]: { [styleKey: string]: string } };
};

export type StyleSettingsType = {
  styles?: Record<string, Array<string>>;
  settings: Array<string>;
  builtInSettings?: Array<string>;
};

export type ContextWithStyleType = {
  root?: { type: string; styles: Array<string> };
  path: Array<{ pathKey: string | number; block?: { type: string; styles: Array<string> } }>;
};

export interface DMEConfigType {
  general?: {
    projectStyles?: {
      default: string;
      [prop: string]: string;
    };
    imagePath?: (path: string, size?: 'thumbnail' | string) => string;
    deviceWidth?: {
      mobile: number;
      tablet: number;
      pc: number;
    };
  };
  editor: {
    defaultTheme?: string;
    favouriteWidgets?: Array<string>;
    zIndex?: number;
    colors?: {
      text?: Array<DME.ColorConfig>;
      border?: Array<DME.ColorConfig>;
      background?: Array<DME.ColorConfig>;
      [colorGroup: string]: Array<DME.ColorConfig> | undefined;
    };
    enableEditControl?: boolean;
    disabledStyleSettings?: { [widget: string]: Array<string> };
    defaultStyle?: { [widget: string]: { [styleKey: string]: string } };
    categories?: Array<DME.WidgetCategory>;
    ui: { [variable: string]: string };
    fontFamily?: Array<{ value: string; label: string }>;
    fontSize?: Array<{ value: string; label: string }>;
    heading?: Array<{ value: string; label: string }>;
    characters?: Array<string>;
    settingPanelWidth?: number;
    //context is from closed list (not including) to self list. eg. hero-text/list
    getAddingSettings?: (context: ContextWithStyleType) => AddingSettingsType;
    //context is from closest mixed to itself. eg. hero-text/list/heading, tabs/0/heading
    getAvailableStyleSettings?: (
      current: { pathKey: string | number; block?: { type: string; styles: Array<string> } },
      context: ContextWithStyleType,
      parentIsList: boolean,
    ) => StyleSettingsType;
  };
  widgets?: { [widget: string]: widgetConfig };
  dataSource?: DataSourceConfigType;
  plugins?: {
    imageHandlers?: Array<
      React.ComponentType<{ image: DME.ImageInfo; onChange: (imageInfo: DME.ImageInfo) => void }>
    >;
    blockSettingActions?: Array<React.ComponentType<{ blockData: DMEData.Block }>>;
    [plugin: string]: any;
  };
}

const defaultConfig = () => {
  return {
    general: {
      projectStyles: {
        default: ``,
      },
      imagePath: (path: string, size?: 'thumbnail' | string) => {
        return path;
      },
      deviceWidth: {
        mobile: 560, //max
        tablet: 960,
        pc: 8000,
      },
      themes: [],
    },
    editor: {
      defaultTheme: 'default',
      favouriteWidgets: [],
      zIndex: 1000,
      enableEditControl: false,
      disabledStyleSettings: {},
      defaultStyle: {},
      colors: {
        text: [
          { color: '#000000', name: 'Black' },
          { color: '#cccccc', name: 'Light gray' },
          { color: '#ffffff', name: '' },
        ],
        border: [
          { color: '#ffffff' },
          { color: '#000000' },
          { color: '#333333' },
          { color: '#666666' },
          { color: '#999999' },
          { color: '#cccccc' },
          { color: '#ffffff' },
        ],
        background: [
          { color: '#ffffff' },
          { color: '#cccccc' },
          { color: '#dddddd' },
          { color: '#ffe6de' },
          { color: '#deffde' },
          { color: '#defeff' },
          { color: '#ffdee8' },
        ],
      },
      settingGroups: {
        style_content: 'Content',
        style_text: 'Text',
        style_block: 'Block',
        style_border: 'Border',
      },
      categories: [
        { identifier: 'basic', name: 'Basic' },
        { identifier: 'design', name: 'Design' },
        { identifier: 'media', name: 'Media' },
        { identifier: 'interactive', name: 'Interactive' },
      ],
      fontFamily: [
        { value: '', label: 'Font' },
        { value: 'Arial', label: 'Arial' },
        { value: 'Times New Roman', label: 'Times New Roman' },
        { value: 'Courier New', label: 'Courier New' },
        { value: 'Tahoma', label: 'Tahoma' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Verdana', label: 'Verdana' },
      ],
      fontSize: [
        { value: '', label: 'Size' },
        { value: '12px', label: '12px' },
        { value: '14px', label: '14px' },
        { value: '16px', label: '16px' },
        { value: '18px', label: '18px' },
        { value: '20px', label: '20px' },
        { value: '22px', label: '22px' },
        { value: '24px', label: '24px' },
        { value: '28px', label: '28px' },
        { value: '30px', label: '30px' },
        { value: '32px', label: '32px' },
        { value: '36px', label: '36px' },
        { value: '40px', label: '40px' },
        { value: '48px', label: '48px' },
      ],
      heading: [
        { value: 'p', label: 'Heading' },
        { value: 'h2', label: 'H2' },
        { value: 'h3', label: 'H3' },
        { value: 'h4', label: 'H4' },
      ],
      characters: ['😃'],
      settingPanelWidth: 400,
      ui: {},
    },
    widgets: {
      text: { fonts: ['Arial', 'Times new man'] },
      'content-view': {
        views: [{ label: 'Block', value: 'block' }], //render:(block, view:string)=>JSX.Element
      },
    },
    dataSource: {},
    plugins: {
      imageHandlers: [],
      blockSettingActions: [],
    },
    callbacks: {},
  };
};

const dmeConfig: {
  general: {
    projectStyles: {
      default: string;
      [prop: string]: string;
    };
    imagePath: (path: string, size?: 'thumbnail' | string) => string;
    deviceWidth: {
      mobile: number;
      tablet: number;
      pc: number;
    };
    themes: Array<DME.PageTheme>;
    [prop: string]: string | number | boolean | Record<string, any>;
  };
  editor: {
    defaultTheme: string;
    favouriteWidgets: Array<string>;
    colors: { [colorGroup: string]: Array<DME.ColorConfig> };
    defaultStyle: { [widget: string]: { [styleKey: string]: string } };
    enableEditControl: boolean;
    disabledStyleSettings: { [widget: string]: Array<string> | string };
    categories: Array<DME.WidgetCategory>;
    settingGroups: { [key: string]: string };
    fontFamily: Array<{ value: string; label: string }>;
    heading: Array<{ value: string; label: string }>;
    fontSize: Array<{ value: string; label: string }>;
    characters: Array<string>;
    zIndex: number;
    settingPanelWidth: number;
    ui: { [variable: string]: string };
    getAddingSettings?: (context: ContextWithStyleType) => AddingSettingsType;
    getAvailableStyleSettings?: (
      current: { pathKey: string | number; block?: { type: string; styles: Array<string> } },
      context: ContextWithStyleType,
      parentIsList: boolean,
    ) => StyleSettingsType;
  };
  widgets: { [widget: string]: widgetConfig };
  plugins: {
    imageHandlers: Array<
      React.ComponentType<{
        image: DME.ImageInfo;
        parameters?: { [key: string]: unknown };
        onChange: (imageInfo: DME.ImageInfo) => void;
      }>
    >;
    blockSettingActions?: Array<React.ComponentType<{ blockData: DMEData.Block }>>;
    [plugin: string]: any;
  };
  dataSource: DataSourceConfigType;
  callbacks: CallbackConfig;
} = defaultConfig();

const setDMEditorConfig = (config: DMEConfigType) => {
  for (const key of Object.keys(config)) {
    if (dmeConfig[key]) {
      if (key === 'editor' && config.editor.categories) {
        dmeConfig.editor.categories = [...dmeConfig.editor.categories, ...config.editor.categories];
        delete config.editor['categories'];
      }

      dmeConfig[key] = { ...dmeConfig[key], ...config[key] };
    }
  }
};

const setDMEditorCallback = (config: CallbackConfig) => {
  dmeConfig.callbacks = { ...dmeConfig.callbacks, ...config };
};

const getStyleConfig = (
  params: {
    current: { pathKey: string | number; block?: { type: string; styles: Array<string> } };
    context: ContextWithStyleType;
    parentIsList: boolean;
  },
  configFile: {
    default: { root: StyleSettingsType; list: StyleSettingsType; underList: StyleSettingsType };
    block: Record<
      string,
      Array<{
        path?: string;
        level?: number;
        blockType?: string;
        rootStyle?: string;
        config: StyleSettingsType;
      }>
    >;
  },
): StyleSettingsType => {
  const context = params.context;
  const current = params.current;
  const parentIsList = params.parentIsList;

  if (!context.root) {
    return configFile.default.root;
  }

  const rootType = context.root.type;
  const pathArr: Array<string | number> = [];
  for (const item of context.path) {
    pathArr.push(item.pathKey);
  }

  const path = pathArr.join('/');
  const level = pathArr.length;

  console.debug('current: ', current, context, 'is list', parentIsList);

  let result: any = null;
  if (configFile.block[rootType]) {
    for (const item of configFile.block[rootType]) {
      let match = true;
      if (item.level != undefined && item.level != level) {
        match = false;
      } else if (item.path && item.path !== path) {
        match = false;
      } else if (item.blockType && current.block?.type !== item.blockType) {
        match = false;
      } else if (item.rootStyle && !context.root.styles.includes(item.rootStyle)) {
        match = false;
      }
      if (match) {
        result = item.config;
      }
    }
  }
  if (!result) {
    if (current.block?.type === 'list') {
      result = configFile.default.list;
    } else if (parentIsList) {
      result = configFile.default.underList;
    } else {
      result = { settings: [], styles: {} };
    }
  }

  console.debug(result);
  return result;
};

export * from './style';
export { dmeConfig, setDMEditorConfig, getStyleConfig, setDMEditorCallback };
