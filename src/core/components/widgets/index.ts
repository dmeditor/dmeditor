import type { ComponentType } from 'react';

import type { DME, DMEData } from 'Core/types';

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
const widgetDefinition: { [key: string]: DME.Widget & {variants: Array<DME.WidgetVariant>} } = {};

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
const getWidget = (type: string): DME.Widget | null => {
  const def = widgetDefinition[type];
  return def ? def : null;
};

const defaultStyle:DME.WidgetStyle = {
  identifier: '_',
  display: 'dropdown',
  name: 'Style',
  options: []
}

function registerWidgetDefinition(widget: DME.Widget) {
  if (widgetDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  widgetDefinition[widget.type] = {...widget, variants:[]};
  //register default style to make sure _default style is always there.
  registerWidgetStyle(widget.type, defaultStyle);
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

function registerWidgetVariant(variant: DME.WidgetVariant) {
  const widgetIdentifier = variant.widget;
  if (!widgetDefinition[widgetIdentifier]) {
      console.error(`Widget ${widgetIdentifier} not found. Can not register variant. ${variant.identifier}`);
  }
  widgetDefinition[widgetIdentifier].variants.push( variant );
}

function getWidgetVariant(widget: string, variant: string): DME.WidgetVariant|null {
  const variants = widgetDefinition[widget].variants;
  return variants.find(item=>item.identifier===variant) || null; 
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
  if(widgetStyles[widget][style.identifier]){
    console.warn(`Style ${style.identifier} is already registered on ${widget}. Ignore.`);
    return
  }
  widgetStyles[widget][style.identifier] = style;
}

//register style option
function registerWidgetStyleOption(
  widget: string,
  styleOption: DME.WidgetStyleOption,
  style: string,
) {
  if( !widgetStyles[widget] || !widgetStyles[widget][style] ){
    console.error(`Widget style ${style} is not found`);
    return;
  }
   widgetStyles[widget][style].options.push(styleOption)
}

//get style with options
function getWidgetStyle(
  widget: string,
  style?: string,
): DME.WidgetStyle{
  style = style || '_';
  const styleObj = widgetStyles[widget][style];
  return styleObj;
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
  registerWidget,
  registerDefaultWidgets,
  registerWidgetVariant,
  getWidgetVariant,
  registerWidgetStyle,
  getWidgetStyle,
  registerWidgetStyleOption,
};

export default widgetDefinition;
