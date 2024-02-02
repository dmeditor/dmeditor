import * as React from 'react';

const { createElement, memo, isValidElement } = React;
const Components: {
  [index: string]:
    | React.LazyExoticComponent<React.ComponentType<unknown>>
    | React.ComponentType<unknown>;
} = {};

const widgetPropertySetting = (settingType: string) => {
  // widgetName = 'margin-top' converted to MarginTop
  let componentName = settingType;
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
  if (!isPropertyRegistered(settingType)) {
    registerPropertyComponent(
      settingType,
      React.lazy(() => import(`./${settingType}/${componentName}`)),
    );
  }
  return Components[settingType];
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

function registerPropertyComponent(
  propName: string,
  componentInstance: React.ComponentType<unknown>,
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

function getPropertyComponent(propName: string) {
  return Components[propName];
}
function getAllPropertyComponents() {
  return Components;
}

const Property = ({ settingType, ...rest }: { settingType: string }) => {
  const Component = widgetPropertySetting(settingType);
  return (
    <React.Suspense fallback="Loading...">
      <Component {...rest} />
    </React.Suspense>
  );
};

export { getAllPropertyComponents, getPropertyComponent, registerPropertyComponent };
export default memo(Property);
