import { ComponentType } from 'react';

import type { DME, DMEData } from '../types';

export type BrowseLinkCallbackParams = string;

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
    defaultTheme: string;
    favouriteWidgets?: Array<string>;
    zIndex?: number;
    colors?: {
      text?: Array<string>;
      border?: Array<string>;
      background?: Array<string>;
      [colorGroup: string]: Array<string> | undefined;
    };
    enableEditControl?: boolean;
    defaultStyle?: { [widget: string]: { [styleKey: string]: string } };
    categories?: Array<DME.WidgetCategory>;
    ui: { [variable: string]: string };
  };
  widgets?: { [widget: string]: widgetConfig };
  plugins?: {
    imageHandlers?: Array<
      React.ComponentType<{ image: DME.ImageInfo; onChange: (imageInfo: DME.ImageInfo) => void }>
    >;
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
      defaultStyle: {},
      colors: {
        text: ['#000000', '#cccccc', '#ffffff'],
        border: ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'],
        background: ['#ffffff', '#cccccc', '#dddddd', '#ffe6de', '#deffde', '#defeff', '#ffdee8'],
      },
      settingGroups: {
        style_block: 'Block',
        style_text: 'Text',
        style_block_container: 'Block container',
        style_border: 'Border',
      },
      categories: [
        { identifier: 'basic', name: 'Basic' },
        { identifier: 'design', name: 'Design' },
        { identifier: 'media', name: 'Media' },
        { identifier: 'intractive', name: 'Intractive' },
      ],
      richText: {
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
      },
      ui: {},
    },
    widgets: {
      text: { fonts: ['Arial', 'Times new man'] },
    },
    plugins: {
      imageHandlers: [],
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
    colors: { [colorGroup: string]: Array<string> };
    defaultStyle: { [widget: string]: { [styleKey: string]: string } };
    enableEditControl: boolean;
    categories: Array<DME.WidgetCategory>;
    settingGroups: { [key: string]: string };
    richText: {
      fontFamily: Array<{ value: string; label: string }>;
      fontSize: Array<{ value: string; label: string }>;
    };
    zIndex: number;
    ui: { [variable: string]: string };
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
    [plugin: string]: any;
  };
  callbacks: CallbackConfig;
} = defaultConfig();

const setDMEditorConfig = (config: DMEConfigType) => {
  for (const key of Object.keys(config)) {
    if (key === 'editor' && config.editor.categories) {
      dmeConfig.editor.categories = [...dmeConfig.editor.categories, ...config.editor.categories];
    } else {
      if (dmeConfig[key]) {
        dmeConfig[key] = { ...dmeConfig[key], ...config[key] };
      }
    }
  }
};

const setDMEditorCallback = (config: CallbackConfig) => {
  dmeConfig.callbacks = { ...dmeConfig.callbacks, ...config };
};

export * from './style';
export { dmeConfig, setDMEditorConfig, setDMEditorCallback };
