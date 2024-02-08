import type { ComponentType } from 'react';

import type { DMEditor } from 'Core/types';

const components: {
  // TODO: make it more type safe
  [key: string]: any;
} = {};

try {
  const modules = require.context('./', true, /\.tsx$/);
  modules.keys().forEach((path: string) => {
    const comp = modules(path).default;
    // reg ./grid/Grid.tsx to /grid(folder name)
    const name = path.replace(/\.\/(.*)\/render.tsx/, '$1');
    // components[name] = comp;
    registerWidgetRender(name, comp);
  });
} catch (e) {
  console.error(e);
}

const properties: string[] = [];
const widgetDefinition: { [key: string]: DMEditor.Widget } = {};

// const widgetDefinition: Widget[] = [];
const layoutDefinition: { [key: string]: DMEditor.Widget } = {};
const customDefinition: { [key: string]: DMEditor.Widget } = {};
try {
  const modules = require.context('./', true, /definition.ts$/);
  modules.keys().forEach((path: string) => {
    // const { data, style, type } = modules(path).default;
    const widget = modules(path).default;
    const { category, settings, type } = widget;

    //todo: handle duplicated registration. (eg. give a warning and override)
    // if (widgetDefinition[type]) {
    // }
    // widgetDefinition[type] = widget;

    if (category === 'widget') {
      registerWidgetDefinition(widget);
    } else if (category === 'layout') {
      addLayoutDefinition(widget);
    } else if (category === 'custom') {
      addCustomDefinition(widget);
    } else {
      console.error(`Unknown category: ${category}`);
    }

    // for debug
    if (type === 'heading' || type === 'tabs') {
      properties.push(widget);
    }
  });
} catch (e) {
  console.error(e);
}

//get widget component for rendering
const getWidgetComponent = (type: string): any => {
  const component = components[type];
  return component ? component : null;
};

//get widget information/definiton/meta data
const getWidget = (type: string): DMEditor.Widget | null => {
  const def = widgetDefinition[type];
  return def ? def : null;
};

function registerWidgetDefinition(widget: DMEditor.Widget) {
  if (widgetDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  widgetDefinition[widget.type] = widget;
}

function addLayoutDefinition(widget: DMEditor.Widget) {
  if (layoutDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  layoutDefinition[widget.type] = widget;
}

function addCustomDefinition(widget: DMEditor.Widget) {
  if (customDefinition[widget.type]) {
    console.warn(`Widget ${widget.type} is already registered.`);
    return;
  }
  customDefinition[widget.type] = widget;
}

function registerWidgetRender(widgetName: string, widgetInstance: ComponentType<any>) {
  if (components[widgetName]) {
    console.warn(`Widget ${widgetName} is already registered.`);
    return;
  }
  components[widgetName] = widgetInstance;
}

export {
  addCustomDefinition,
  addLayoutDefinition,
  registerWidgetDefinition,
  getWidgetComponent,
  registerWidgetRender,
  properties,
  // widgetDefinition,
  widgetDefinition,
  layoutDefinition,
  customDefinition,
  getWidget,
};

export default widgetDefinition;
