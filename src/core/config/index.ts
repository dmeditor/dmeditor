import { ComponentType } from 'react';

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
  browseLink?: ComponentType;
}

export interface widgetConfig {
  defaultStyle?: { [identifier: string]: string };
  [prop: string]: any;
}

export interface DMEConfigType {
  widgets?: { [widget: string]: widgetConfig };
  plugins?: { [plugin: string]: any };
}

const defaultConfig = () => {
  return {
    general: {},
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
  general: { [prop: string]: string | number | boolean };
  editor: {
    defaultTheme?: string;
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
