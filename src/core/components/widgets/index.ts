import { Widget } from '../types/blocktype';

/**
 * define all property setting components
 **/
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
    components[name] = comp;
  });
} catch (e) {
  console.error(e);
}

const properties: string[] = [];
const widgetMap: { [key: string]: Widget } = {};
try {
  const modules = require.context('./', true, /definition.ts$/);
  modules.keys().forEach((path: string) => {
    // const { data, style, type } = modules(path).default;
    const widget = modules(path).default;
    const { settings, type } = widget;

    if(widgetMap[type]){
      //todo: handle duplicated registration. (eg. give a warning and override)
    }
    widgetMap[type] = widget;
    
    // for debug
    if (type === 'heading') {
      properties.push({
        type,
        ...settings,
      });
    }
  });
} catch (e) {
  console.error(e);
}

//get widget component for rendering
const getWidgetComponent = (type: string): any => {
  const component =  components[type];
  return component?component:null;
};

//get widget information/definiton/meta data
const getWidget = (type:string):Widget|null=>{
  const def = widgetMap[type]; 
  return def?def:null;
}

export { getWidgetComponent, properties, getWidget };

export default widgetMap;
