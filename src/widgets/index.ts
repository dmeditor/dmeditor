export const registerDefaultWidgets = () => {
  try {
    const modules = require.context('./', true, /\/$/);
    console.log(modules)
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
