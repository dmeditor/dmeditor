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
    },
    editor: {
      defaultTheme: 'default',
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
    richText: {
      fontFamily: Array<{ value: string; label: string }>;
      fontSize: Array<{ value: string; label: string }>;
    };
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
