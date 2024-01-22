import * as React from 'react';

const { memo } = React;
const Components: {
  [index: string]: React.LazyExoticComponent<React.ComponentType<unknown>>;
} = {};

const widgetProperySetting = (settingType: string) => {
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
  Components[settingType] = React.lazy(() => import(`./${settingType}/${componentName}`));
  return Components[settingType];
};

const Property = ({
  settingType,
  ...rest
}: {
  settingType: string;
}) => {
  const Component = widgetProperySetting(settingType);
  console.log('rest', rest);
  return (
    <React.Suspense fallback="Loading...">
      <Component {...rest} />
    </React.Suspense>
  );
};

export default memo(Property);
