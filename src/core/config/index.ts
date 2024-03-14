import { ComponentType } from 'react';
import { DME } from 'dmeditor';

export interface LinkInfo {
  href: string; // url
  text?: string;
  id?: string | number;
}

export type BrowseLinkCallbackParams = LinkInfo[];

export interface ImageInfo {
  src: string;
  description?: string;
  title?: string;
  thumbnail?: string;
  id?: string | number;
}

export type BrowseImageCallbackParams = ImageInfo[];

export interface CallbackConfig {
  browseImage?: ComponentType<{
    value: BrowseImageCallbackParams;
    onChange: (value: BrowseImageCallbackParams) => void;
  }>;
  browseLink?: ComponentType<{
    value: BrowseLinkCallbackParams;
    onChange: (value: BrowseLinkCallbackParams) => void;
  }>;
}

export interface widgetConfig {
  defaultStyle?: { [identifier: string]: string };
  allowedTypes?: Array<string>;
  [prop: string]: any;
}

export interface DMEConfigType {
  general?: {
    projectStyles?: {
      default: string;
      [prop: string]: string;
    };
  };
  widgets?: { [widget: string]: widgetConfig };
  plugins?: { [plugin: string]: any };
}

const defaultConfig = () => {
  return {
    general: {
      projectStyles: {
        default: '',
      },
      themes: [],
    },
    editor: {
      defaultTheme: 'default',
    },
    widgets: {
      text: { fonts: ['Arial', 'Times new man'] },
    },
    plugins: {},
    callbacks: {},
  };
};

const dmeConfig: {
  general: {
    projectStyles: {
      default: string;
      [prop: string]: string;
    };
    themes: Array<DME.PageTheme>;
    [prop: string]: string | number | boolean | Record<string, any>;
  };
  editor: {
    defaultTheme: string;
  };
  widgets: { [widget: string]: widgetConfig };
  plugins: { [plugin: string]: any };
  callbacks: CallbackConfig;
} = defaultConfig();

const setDMEditorConfig = (config: DMEConfigType) => {
  for (const key of Object.keys(config)) {
    if (dmeConfig[key]) {
      dmeConfig[key] = { ...dmeConfig[key], ...config[key] };
    }
  }
};

const setDMEditorCallback = (config: CallbackConfig) => {
  dmeConfig.callbacks = { ...dmeConfig.callbacks, ...config };
};

export { dmeConfig, setDMEditorConfig, setDMEditorCallback };
