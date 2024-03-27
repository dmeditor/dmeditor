import { ComponentType } from 'react';
import { DME } from 'dmeditor';

export type BrowseLinkCallbackParams = string;

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
    multiple?: boolean;
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
  editor: {
    defaultTheme: string;
    ui: { [variable: string]: string };
  };
  widgets?: { [widget: string]: widgetConfig };
  plugins?: { [plugin: string]: any };
}

const defaultConfig = () => {
  return {
    general: {
      projectStyles: {
        default: ``,
      },
      themes: [],
      richText: {
        fontFamily: ['Arial', 'Times New Roman', 'Courier New', 'Tahoma', 'Georgia', 'Verdana'],
        fontSize: [
          '12px',
          '14px',
          '16px',
          '18px',
          '20px',
          '22px',
          '24px',
          '28px',
          '30px',
          '32px',
          '36px',
          '40px',
          '48px',
        ],
      },
    },
    editor: {
      defaultTheme: 'default',
      ui: {},
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
    richText: {
      fontFamily: Array<string>;
      fontSize: Array<string>;
    };
    [prop: string]: string | number | boolean | Record<string, any>;
  };
  editor: {
    defaultTheme: string;
    ui: { [variable: string]: string };
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

export * from './style';
export { dmeConfig, setDMEditorConfig, setDMEditorCallback };
