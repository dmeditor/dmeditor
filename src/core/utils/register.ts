import type { ComponentType } from 'react';
import { AccessAlarm } from '@mui/icons-material';

import { registerServerSideLoad, ServerSideLoadFunction } from '../ssr';
import type { DME, DMEData } from '../types';

export const components: {
  // TODO: make it more type safe
  [key: string]: any;
} = {};
export const properties: string[] = [];
export const widgetDefinition: {
  [key: string]: DME.Widget & { variants: Array<DME.WidgetVariant> };
} = {};
export const layoutDefinition: { [key: string]: DME.Widget } = {};
export const customDefinition: { [key: string]: DME.Widget } = {};

//get widget component for rendering
export const getWidgetComponent = (type: string): DME.WidgetImplemenation => {
  const component = components[type];
  return component ? component : null;
};

//get widget information/definiton/meta data
export const getWidget = (widget: string) => {
  const arr = widget.split(':');
  const def = widgetDefinition[arr[0]];
  return def as DME.Widget;
};

//get widget name, with variant considered.
export const getWidgetName = (widget: string) => {
  const [widgetObj, variant] = getWidgetWithVariant(widget);
  if (variant) {
    return variant.name;
  }
  return widgetObj?.name || '';
};

export const getWidgetWithVariant = (widget: string) => {
  const arr = widget.split(':');
  const def = widgetDefinition[arr[0]];

  let variant = undefined;
  if (arr[1]) {
    if (def) {
      variant = def.variants.find((variant) => variant.identifier === arr[1]);
    }
  }
  return [def as DME.Widget | undefined, variant] as const;
};

export const defaultStyle = (): DME.WidgetStyle => {
  const preDefinedStyle = {
    identifier: '_',
    display: 'dropdown',
    name: 'Pre-defined',
    options: [] as Array<DME.WidgetStyleOption>,
  } as DME.WidgetStyle;
  return preDefinedStyle;
};

export function registerWidgetDefinition(widget: DME.Widget) {
  if (widgetDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  widgetDefinition[widget.type] = { ...widget, variants: [] };
  //register default style to make sure _default style is always there.
  registerWidgetStyle(widget.type, defaultStyle());
}

export function addLayoutDefinition(widget: DME.Widget) {
  if (layoutDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  layoutDefinition[widget.type] = widget;
}

export function addCustomDefinition(widget: DME.Widget) {
  if (customDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  customDefinition[widget.type] = widget;
}

export function registerWidgetComponent(
  widgetName: string,
  widgetInstance: DME.WidgetImplemenation,
) {
  if (components[widgetName]) {
    console.warn(`Widget ${widgetName} is already registered.`);
    return;
  }
  components[widgetName] = widgetInstance;
}

export function registerWidget(definition: DME.Widget, implementation: DME.WidgetImplemenation) {
  registerWidgetDefinition(definition);
  registerWidgetComponent(definition.type, implementation);
  if (implementation.onServerSideLoad) {
    registerServerSideLoad(definition.type, implementation.onServerSideLoad);
  }
}

export function registerWidgetVariant(variant: DME.WidgetVariant, styles?: Array<DME.WidgetStyle>) {
  const widgetIdentifier = variant.widget;
  if (!widgetDefinition[widgetIdentifier]) {
    console.error(
      `Widget ${widgetIdentifier} not found. Can not register variant. ${variant.identifier}`,
    );
    return;
  }
  widgetDefinition[widgetIdentifier].variants.push(variant);

  if (styles) {
    styles.forEach((style) => {
      registerWidgetStyle(variant.widget + ':' + variant.identifier, style);
    });
  } else {
    registerWidgetStyle(widgetIdentifier + ':' + variant.identifier, defaultStyle());
  }
}

export function getWidgetVariant(widget: string, variant: string): DME.WidgetVariant | null {
  const variants = widgetDefinition[widget].variants;
  return variants.find((item) => item.identifier === variant) || null;
}

//widget styles. Can be variant also(eg. heading:article-title)
export const widgetStyles: {
  [widget: string]: {
    //style identifier => style
    [style: string]: DME.WidgetStyle;
  };
} = {};

//register style without verifying widget
export function registerWidgetStyle(widget: string, style: DME.WidgetStyle) {
  if (!widgetStyles[widget]) {
    widgetStyles[widget] = {};
  }
  const identifier = style.identifier || '_';
  if (widgetStyles[widget][identifier]) {
    console.warn(`Style ${style.identifier} is already registered on ${widget}. Ignore.`);
    return;
  }
  widgetStyles[widget][identifier] = style;
}

//register style option
export function registerWidgetStyleOption(
  widget: string,
  styleOptions: Array<DME.WidgetStyleOption>,
  style?: string,
) {
  if (!style) {
    style = '_';
  }
  if (!widgetStyles[widget] || !widgetStyles[widget][style]) {
    console.error(`Widget style ${style} is not found`);
    return;
  }
  const options = widgetStyles[widget][style].options;
  widgetStyles[widget][style].options = [...options, ...styleOptions];
}

//get a style, ignore enabledSettings
export function getWidgetStyle(widget: string, style?: string): DME.WidgetStyle {
  const styles = getWidgetStyles(widget, true);
  style = style || '_';
  const styleObj = styles[style];
  return styleObj;
}

export function getWidgetStyleOption(
  widget: string,
  option: string,
  style?: string,
): DME.WidgetStyleOption | undefined {
  const styleDef = getWidgetStyle(widget, style);
  return styleDef.options.find((item) => item.identifier == option);
}

//filter by keys
function filterByKeys<T>(obj: { [prop: string]: T }, keys: Array<string>) {
  let result: { [prop: string]: T } = {};
  keys.forEach((key) => {
    if (obj[key]) result[key] = obj[key];
  });
  return result;
}

//get wiget styles(including varianted widget)
export function getWidgetStyles(widget: string, allStyles?: boolean) {
  const [widgetObj, variant] = getWidgetWithVariant(widget);
  const arr = widget.split(':');
  const styles = widgetStyles[arr[0]];
  if (allStyles) {
    if (variant) {
      return { ...styles, ...widgetStyles[widget] };
    } else {
      return styles;
    }
  } else {
    const enabledStyles = variant ? variant.enabledStyles : widgetObj?.enabledStyles;
    const widgetEnabledStyles = enabledStyles ? filterByKeys(styles, enabledStyles) : styles;
    if (variant) {
      //if there is variant, use variant enabled style(on widget) + variant styles.
      const variantStyles = widgetStyles[widget];
      return { ...widgetEnabledStyles, ...variantStyles };
    } else {
      //if no variant, use widget enabled style
      return widgetEnabledStyles;
    }
  }
}

//remove empty option style
export function getValidStyles(widget: string) {
  const allStyles = getWidgetStyles(widget) || {};
  const validStyles: { [key: string]: DME.WidgetStyle } = {};
  for (const styleKey of Object.keys(allStyles)) {
    const styleObj = allStyles[styleKey];
    if (styleObj.options.length > 0) {
      validStyles[styleKey] = styleObj;
    }
  }
  return validStyles;
}

export const getAllowedTypes = (widgetStr: string) => {
  const [widget, variant] = getWidgetWithVariant(widgetStr);
  if (variant) {
    return variant.allowedTypes;
  }
  return widget?.allowedTypes;
};

interface Icon {
  name: string;
  component: any;
}

export const IconDefinition: {
  prefix: string;
  icons: Icon[];
} = {
  prefix: 'dme-icon',
  icons: [
    // { name: 'arrow-down', path: 'M0 0h24v24H0z', viewBox: '0 0 24 24' },
    { name: 'access-alarm', component: AccessAlarm },
  ],
};

export const registerIcon = (icon: Icon) => {
  if (IconDefinition.icons.find((i) => i.name === icon.name)) {
    console.warn(`Icon with name ${icon.name} already exists. Ignore`);
  } else {
    IconDefinition.icons.push(icon);
  }
};

export const registerDefaultWidgets = () => {
  try {
    const modules = require.context('../../widgets/', true, /index.ts$/);
    modules.keys().forEach((path: string) => {
      const register = modules(path).default;
      if (typeof register === 'function') {
        register();
      }
    });
  } catch (e) {
    console.error(e);
  }
};
