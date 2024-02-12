import { WidgetVariant } from './../../types/dmeditor';
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
const registerDefaultWidgets = ()=>{
  try {
      const modules = require.context('./', true, /\/$/ );
      modules.keys().forEach((path: string) => {
        const register = modules(path).default;
        if( typeof register === 'function'){
         register();
        }
      });
    } catch (e) {
      console.error(e);
    }
}

const properties: string[] = [];
const widgetDefinition: { [key: string]: DME.Widget } = {};

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

function registerWidgetDefinition(widget: DME.Widget) {
  if (widgetDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  widgetDefinition[widget.type] = widget;
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

function registerWidget(definition: DME.Widget, renderComponent:ComponentType<any> ){
  registerWidgetDefinition(definition);
  registerWidgetComponent(definition.type, renderComponent);
}

//variant of a widget, eg. article-overview is a list with heading, image, link
export const widgetVariants: { [key:string]: {[key: string]: DME.WidgetVariant}} = {};

function registerWidgetVariant(variant: DME.WidgetVariant){
    const widgetIdentifier = variant.widget;
    if( !widgetVariants[widgetIdentifier] ){
      widgetVariants[widgetIdentifier] = {};
    }
    widgetVariants[widgetIdentifier][variant.identifier] = variant;
}

function getWidgetVariants(widget: string){ //get all variants of a widget
  return widgetVariants[widget];
}

function getWidgetVariant(widget: string, variant: string):(DME.WidgetVariant|null){
  const variants =  widgetVariants[widget];
  if(variants){    
    return variants[variant];
  }else{
    console.error(`Varient ${variant} is not found on ${widget}.`);
    return null;
  }
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
  getWidgetVariants,
  getWidgetVariant
};

export default widgetDefinition;
