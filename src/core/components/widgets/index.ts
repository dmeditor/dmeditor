import type { ComponentType } from 'react';

import type { DME, DMEData } from 'Core/types/dmeditor';

const components: {
  // TODO: make it more type safe
  [key: string]: any;
} = {};

// try {
//   const modules = require.context('./', true, /\.tsx$/);
//   modules.keys().forEach((path: string) => {
//     const comp = modules(path).default;
//     // reg ./grid/Grid.tsx to /grid(folder name)
//     const name = path.replace(/\.\/(.*)\/render.tsx/, '$1');
//     registerWidgetComponent(name, comp);
//   });
// } catch (e) {
//   console.error(e);
// }
const registerDefaultWidgets = () => {
  try {
    const modules = require.context('./', true, /\/$/);
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

const properties: string[] = [];
const widgetDefinition: { [key: string]: DME.Widget & { variants: Array<DME.WidgetVariant> } } = {};

// const widgetDefinition: Widget[] = [];
const layoutDefinition: { [key: string]: DME.Widget } = {};
const customDefinition: { [key: string]: DME.Widget } = {};
// try {
//   const modules = require.context('./', true, /definition.ts$/);
//   modules.keys().forEach((path: string) => {
//     // const { data, style, type } = modules(path).default;
//     const widget = modules(path).default;
//     const { category, settings, type } = widget;

//     //todo: handle duplicated registration. (eg. give a warning and override)

//     if (category === 'widget') {
//       registerWidgetDefinition(widget);
//     } else if (category === 'layout') {
//       addLayoutDefinition(widget);
//     } else if (category === 'custom') {
//       addCustomDefinition(widget);
//     } else {
//       console.error(`Unknown category: ${category}`);
//     }

//     // for debug
//     if (type === 'heading' || type === 'tabs') {
//       properties.push(widget);
//     }
//   });
// } catch (e) {
//   console.error(e);
// }

//get widget component for rendering
const getWidgetComponent = (type: string): any => {
  const component = components[type];
  return component ? component : null;
};

//get widget information/definiton/meta data
const getWidget = (widget: string) => {
  const arr = widget.split(':');
  const def = widgetDefinition[arr[0]];
  return def as DME.Widget;
};

//get widget name, with variant considered.
const getWidgetName = (widget:string) =>{
  const [widgetObj, variant] = getWidgetWithVariant(widget);
  if(variant){
    return variant.name;
  }
  return widgetObj?.name||'';
}

const getWidgetWithVariant = (widget: string) => {
  const arr = widget.split(':');
  const def = widgetDefinition[arr[0]];

  let variant = undefined;
  if (arr[1]) {
    variant = def.variants.find((variant) => variant.identifier === arr[1]);
  }
  return [def as DME.Widget|undefined, variant] as const;
};

const defaultStyle = (): DME.WidgetStyle => {
  return{
    identifier: '_',
    display:'dropdown',
    name: 'Pre-defined style',
    options: [],
  }
};

function registerWidgetDefinition(widget: DME.Widget) {
  if (widgetDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  widgetDefinition[widget.type] = { ...widget, variants: [] };
  //register default style to make sure _default style is always there.
  registerWidgetStyle(widget.type, defaultStyle());
}

function addLayoutDefinition(widget: DME.Widget) {
  if (layoutDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  layoutDefinition[widget.type] = widget;
}

function addCustomDefinition(widget: DME.Widget) {
  if (customDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  customDefinition[widget.type] = widget;
}

function registerWidgetComponent(widgetName: string, widgetInstance: ComponentType<any>) {
  if (components[widgetName]) {
    console.warn(`Widget ${widgetName} is already registered.`);
    return;
  }
  components[widgetName] = widgetInstance;
}

function registerWidget(definition: DME.Widget, renderComponent: ComponentType<any>) {
  registerWidgetDefinition(definition);
  registerWidgetComponent(definition.type, renderComponent);
}

function registerWidgetVariant(variant: DME.WidgetVariant, styles?: Array<DME.WidgetStyle>) {
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
  }
}

function getWidgetVariant(widget: string, variant: string): DME.WidgetVariant | null {
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
function registerWidgetStyle(widget: string, style: DME.WidgetStyle) {
  if (!widgetStyles[widget]) {
    widgetStyles[widget] = {};
  }
  const identifier = style.identifier||'_';
  if (widgetStyles[widget][identifier]) {
    console.warn(`Style ${style.identifier} is already registered on ${widget}. Ignore.`);
    return;
  }
  widgetStyles[widget][identifier] = style;
}

//register style option
function registerWidgetStyleOption(
  widget: string,
  styleOptions: Array<DME.WidgetStyleOption>,
  style?: string,
) {
  if(!style){
    style = '_';
  }
  if (!widgetStyles[widget] || !widgetStyles[widget][style]) {
    console.error(`Widget style ${style} is not found`);
    return;
  }
  widgetStyles[widget][style].options = [...(widgetStyles[widget][style].options), ...styleOptions];
}

//get a style, ignore enabledSettings
function getWidgetStyle(widget: string, style?: string): DME.WidgetStyle {
  const styles = getWidgetStyles(widget, true);
  style = style || '_';
  const styleObj = styles[style];
  return styleObj;
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
function getWidgetStyles(widget: string, allStyles?: boolean) {
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

const getAllowedTypes = (widgetStr:string)=>{
  const [widget, variant] = getWidgetWithVariant(widgetStr);
  if(variant){
      return variant.allowedTypes;
  }    
  return widget?.allowedTypes;
}

export {
  addCustomDefinition,
  addLayoutDefinition,
  registerWidgetDefinition,
  getWidgetComponent,
  registerWidgetComponent,
  properties,
  widgetDefinition,
  layoutDefinition,
  customDefinition,
  getWidget,
  getWidgetName,
  getWidgetWithVariant,
  registerWidget,
  registerDefaultWidgets,
  registerWidgetVariant,
  getWidgetVariant,
  registerWidgetStyle,
  getWidgetStyle,
  getWidgetStyles,
  registerWidgetStyleOption,
  getAllowedTypes
};

export default widgetDefinition;
