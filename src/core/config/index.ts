import { ComponentType } from 'react';
import { DME } from 'dmeditor';

export interface CallbackConfig {
  browseImage?: ComponentType<{ value: string; onChange: (value: string) => void }>;
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
