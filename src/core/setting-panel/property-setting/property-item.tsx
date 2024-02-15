import * as React from 'react';

const { createElement, memo, isValidElement } = React;
const Components: {
  [index: string]:
    | React.LazyExoticComponent<React.ComponentType<unknown>>
    | React.ComponentType<unknown>;
} = {};

const widgetPropertySetting = (settingComponent: string) => {
  // widgetName = 'margin-top' converted to MarginTop
  let componentName = settingComponent;
  const convertToCamelCase = (str: string) => {
    return str
      .split('-')
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word[0].toUpperCase() + word.slice(1);
      })
      .join('');
  };
  if (componentName.indexOf('-') !== -1) {
    componentName = convertToCamelCase(componentName);
  } else {
    componentName = componentName[0].toUpperCase() + componentName.slice(1);
  }

  // register component
  // const MarginTop = React.lazy(() => import(`./margin-top/MarginTop`));
  // Components[settingType] = React.lazy(() => import(`./${settingType}/${componentName}`));
  if (!isPropertyRegistered(settingComponent)) {
    registerSettingComponent(
      settingComponent,
      React.lazy(() => import(`./${settingComponent}/${componentName}`)),
    );
  }
  return Components[settingComponent];
};

// isPropertyComponentRegistered('margin-top');

/**
 * @method isPropertyComponentRegistered
 * @param propName: string - property name
 * @returns boolean - true if property component is registered
 */
function isPropertyRegistered(propName: string) {
  if (!propName) return false;
  return !!Components[propName];
}

function registerSettingComponent(
  propName: string,
  componentInstance: React.ComponentType<any>,
) {
  if (!isValidElement(createElement(componentInstance))) {
    console.warn(`Property ${propName} is not a valid component`);
    return;
  }
  if (Components[propName]) {
    console.warn(`Property ${propName} is already registered`);
    return;
  }
  Components[propName] = componentInstance;
}

function getSettingComponent(propName: string) {
  return Components[propName];
}
function getAllSettingComponents() {
  return Components;
}

const Property = ({ settingComponent, ...rest }: { settingComponent: string }) => {
  const Component = widgetPropertySetting(settingComponent);
  return (
    <React.Suspense fallback="Loading...">
      <Component {...rest} />
    </React.Suspense>
  );
};

export { getAllSettingComponents, getSettingComponent, registerSettingComponent };
export default memo(Property);
