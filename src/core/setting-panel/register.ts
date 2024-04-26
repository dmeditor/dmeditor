import { isUndefinedOrNull } from '../utils';
import { registerSettingComponent } from './property-setting/property-item';

/**
 * properties register: common, widget, custom, event
 * Map<propName, propertyComponentName>
 */

// the common properties that are invoked by all widgets
const commonProperties: { [type: string]: string } = {
  align: 'Align',
  'background-color': 'Color',
  color: 'Color',
  'margin-top': 'MarginTop',
  padding: 'Padding',
  width: 'Width',
};

// the widget properties that are defined by different widgets
const widgetProperties: { [type: string]: string } = {
  anchor: 'Anchor',
  level: 'Level',
};

// the widget properties that are is defined by user
const customProperties: { [type: string]: string } = {};

const eventProperties: { [type: string]: string } = {
  createBlock: 'CreateBlock',
  updateData: 'UpdateData',
};

/**
 * register common properties
 * @param uniquePropertyName
 * @param componentName
 */
function registerCommonProperty(uniquePropertyName: string, componentName: string) {
  if (isUndefinedOrNull(componentName)) {
    console.warn(
      `${uniquePropertyName} will not be registered because componentName is undefined or null`,
    );
  } else {
    commonProperties[uniquePropertyName] = componentName;
  }
}

function registerCustomProperty(uniquePropertyName: string, componentName: string) {
  if (isUndefinedOrNull(componentName)) {
    console.warn(
      `${uniquePropertyName} will not be registered because componentName is undefined or null`,
    );
  } else {
    customProperties[uniquePropertyName] = componentName;
  }
}

/**
 * register widget properties
 * @param uniquePropertyName
 * @param componentName
 */
function registerWidgetProperty(uniquePropertyName: string, componentName: string) {
  if (isUndefinedOrNull(componentName)) {
    console.warn(
      `${uniquePropertyName} will not be registered because componentName is undefined or null`,
    );
  } else {
    widgetProperties[uniquePropertyName] = componentName;
  }
}

function registerEventProperty(uniquePropertyName: string, componentName: string) {
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
function isRegisteredCustomProperty(uniquePropertyName: string): boolean {
  return customProperties[uniquePropertyName] !== undefined;
}
function isRegisteredProperties(uniquePropertyName: string): boolean {
  return (
    isRegisteredCommonProperty(uniquePropertyName) ||
    isRegisteredWidgetProperty(uniquePropertyName) ||
    isRegisteredEventProperty(uniquePropertyName) ||
    isRegisteredCustomProperty(uniquePropertyName)
  );
}

export {
  commonProperties,
  registerCustomProperty,
  registerCommonProperty,
  registerEventProperty,
  registerWidgetProperty,
  registerSettingComponent,
  isRegisteredProperties,
  isRegisteredCommonProperty,
  isRegisteredCustomProperty,
  isRegisteredEventProperty,
  isRegisteredWidgetProperty,
};
