import * as React from 'react';

import { isUndefinedOrNull } from '../utils';
import { Components } from './property-setting/property-item';

/**
 * properties register
 * Map<propName, propertyComponentName>
 */
const commonProperties: { [type: string]: string } = {
  align: 'Align',
  'background-color': 'Color',
  color: 'Color',
  'margin-top': 'MarginTop',
  padding: 'Padding',
  width: 'Width',
};

const widgetProperties: { [type: string]: string } = {
  anchor: 'Anchor',
  level: 'Level',
};

const eventProperties: { [type: string]: string } = {
  createBlock: 'CreateBlock',
  updateData: 'UpdateData',
};

/**
 * register common properties
 * @param uniquePropertyName
 * @param componentName
 */
function registerCommonProperties(uniquePropertyName: string, componentName: string) {
  if (isUndefinedOrNull(componentName)) {
    console.warn(
      `${uniquePropertyName} will not be registered because componentName is undefined or null`,
    );
  } else {
    commonProperties[uniquePropertyName] = componentName;
  }
}

/**
 * register widget properties
 * @param uniquePropertyName
 * @param componentName
 */
function registerWidgetProperties(uniquePropertyName: string, componentName: string) {
  if (isUndefinedOrNull(componentName)) {
    console.warn(
      `${uniquePropertyName} will not be registered because componentName is undefined or null`,
    );
  } else {
    widgetProperties[uniquePropertyName] = componentName;
  }
}

function registerEventProperties(uniquePropertyName: string, componentName: string) {
  if (isUndefinedOrNull(componentName)) {
    console.warn(
      `${uniquePropertyName} will not be registered because componentName is undefined or null`,
    );
  } else {
    eventProperties[uniquePropertyName] = componentName;
  }
}

function isRegisteredCommonProperty(uniquePropertyName: string): boolean {
  return commonProperties[uniquePropertyName] !== undefined;
}
function isRegisteredWidgetProperty(uniquePropertyName: string): boolean {
  return widgetProperties[uniquePropertyName] !== undefined;
}
function isRegisteredEventProperty(uniquePropertyName: string): boolean {
  return eventProperties[uniquePropertyName] !== undefined;
}
function isRegisteredProperties(uniquePropertyName: string): boolean {
  return (
    isRegisteredCommonProperty(uniquePropertyName) ||
    isRegisteredWidgetProperty(uniquePropertyName) ||
    isRegisteredEventProperty(uniquePropertyName)
  );
}

function registerComponent(
  // uniquePropertyName: string,
  componentName: string,
  componentInstance: React.ComponentType<any>,
) {
  // Components[uniquePropertyName] = React.lazy(() => import(`./property-setting/${componentName}`));
  if (!React.isValidElement(componentInstance)) return;
  Components[componentName] = componentInstance;
  // registerCommonProperties(uniquePropertyName, componentName);
}

function regiterDMEditor() {
  // registerCommonProperties();
}
// resigter component

export {
  commonProperties,
  registerComponent,
  registerCommonProperties,
  registerWidgetProperties,
  registerEventProperties,
  isRegisteredProperties,
  isRegisteredCommonProperty,
  isRegisteredEventProperty,
  isRegisteredWidgetProperty,
};
