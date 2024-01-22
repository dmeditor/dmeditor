import * as React from 'react';

const { memo } = React;
const Components: {
  [index: string]: React.LazyExoticComponent<React.ComponentType<unknown>>;
} = {};

const widgetProperySetting = (propName: string, componentName: string) => {
  // widgetName = 'margin-top' converted to MarginTop
  let widgetName = componentName;
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
  if (widgetName.indexOf('-') !== -1) {
    widgetName = convertToCamelCase(widgetName);
  } else {
    widgetName = widgetName[0].toUpperCase() + widgetName.slice(1);
  }
  // register component
  // const MarginTop = React.lazy(() => import(`./margin-top/MarginTop`));    
  Components[widgetName] = React.lazy(() => import(`./${componentName}`));
  return Components[componentName];
};

const Property = ({
  componentName,
  propName,
  // type,
  ...rest
}: {
  componentName: string;
  propName: string;
  // type: string;
}) => {
  const Component = widgetProperySetting(propName, componentName);
  console.log('rest', rest);
  return (
    <React.Suspense fallback="Loading...">
      <Component {...rest} />
    </React.Suspense>
  );
};

export default memo(Property);
