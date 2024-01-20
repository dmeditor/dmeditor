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
    // reg ./grid/Grid.tsx to /Grid
    const name = path.replace(/\.\/(.*)\/(.*)\.tsx/, '$2');
    console.log(name);
    components[name] = comp;
  });
} catch (e) {
  console.error(e);
}

const properties: string[] = [];
try {
  const modules = require.context('./', true, /meta\-data\.ts$/);
  modules.keys().forEach((path: string) => {
    // const { data, style, type } = modules(path).default;
    const { settings, type } = modules(path).default;
    // for debug
    if (type === 'Heading') {
      properties.push({
        type,
        ...settings,
      });
    }
  });
} catch (e) {
  console.error(e);
}

export { properties };

export default components;
