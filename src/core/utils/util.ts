'use strict';

import { BaseNode, Descendant, Node, Element as SlateElement } from 'slate';

import type { DMEData } from '../types';
import { logger } from './log';
import { getWidgetStyle } from './register';

export function jsonParse<T>(obj: string): T {
  try {
    return JSON.parse(obj);
  } catch (e) {
    throw new Error('jsonParse error');
  }
}

export function jsonStringify<T>(obj: T): string {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    throw new Error('jsonStringify error');
  }
}

// simple clone deep
export function simpleCloneDeep<T>(obj: T): unknown {
  if (obj === null) return null;
  if (obj === undefined) return undefined;
  return jsonParse(jsonStringify(obj));
}

export function isHTMLElement(node: unknown): node is HTMLElement {
  // return node instanceof HTMLElement;
  return (node as HTMLElement).innerText !== undefined;
}

export function isStrictlyInfinity(value: number): value is typeof Infinity {
  return value === Infinity || value === -Infinity;
}

/**
 * @method isNull
 * @param value
 * @returns {boolean} true if value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * @method isUndefinedOrNull
 * @param {unknown} value
 * @returns {boolean} true if value is undefined or null
 *                    false if value is not undefined or null
 **/
export function isUndefinedOrNull(value: unknown): value is boolean {
  return isNull(value) || isUndefined(value);
}

/**
 * @method isPlainObject
 * @param value
 * @returns {boolean} true if value is plain object
 *                    false if value is not plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && value.constructor === Object;
}

/**
 * @method isKeyInObject
 * @param {string} key - key to check
 * @param {object} obj - object to check
 * @returns {boolean} true if key is in object
 */
export function isKeyInObject<T, K extends keyof T>(
  key: string,
  obj: T,
): obj is T & Record<K, unknown> {
  if (isPlainObject(obj)) {
    return key in obj;
  }
  return false;
}

export function getPropertyName(name: string) {
  if (name.startsWith('settings.')) {
    return name.replace('settings.', '');
  } else if (name.startsWith('.')) {
    return name.replace('.', '');
  } else {
    throw new Error(`Invalid property name: ${name}`);
  }
}

function getPropertySettingsValue(propertyString: string, blockData: DMEData.Block): unknown {
  const { data } = blockData;
  if (propertyString.startsWith('settings.')) {
    if (propertyString.startsWith('settings.general.')) {
      const property = propertyString.split('.')[2];
      if (property) {
        return data?.settings?.general?.[property as keyof DMEData.GeneralSettingType];
      } else {
        throw new Error(`Invalid property name: ${propertyString}`);
      }
    } else {
      return data?.['settings']?.[getPropertyName(propertyString)];
    }
  } else if (propertyString.startsWith('.')) {
    return data[getPropertyName(propertyString)];
  } else {
    throw new Error(`Invalid property name: ${propertyString}`);
  }
}

export const getPropertyFromChildren = (name: string, blockChildren: DMEData.Block['children']) => {
  if (name.startsWith('.')) {
    if (Array.isArray(blockChildren)) {
      return blockChildren;
    } else {
      logger.warn('Invalid property children');
      return [];
    }
  } else {
    throw new Error(`Invalid property name: ${name}`);
  }
};

/*
 * @method isEmptyString
 * @param {string} value
 * @returns {boolean} true if value is empty string
 *                    false if value is not empty string
 */
export function isEmptyString(value: string): boolean {
  return value === '';
}

/**
 * @method imageExtensionIsValid
 * @param extension string image extension
 * @returns boolean true if extension is valid
 */
export function imageExtensionIsValid(extension: string | undefined): boolean {
  if (!extension) return false;
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension);
}

/**
 * @method isUrl
 * @param url string url to check
 * @returns boolean true if url is valid
 */
export function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * @method isString
 * @param value
 * @returns {boolean} true if value is string
 *                   false if value is not string
 * */
export function isString(value: unknown): Boolean {
  return (
    typeof value === 'string' ||
    value instanceof String ||
    Object.prototype.toString.call(value) === '[object String]'
  );
}

function getCssValue(cssStyle: string, attribute: string): string | null {
  const regex = new RegExp(`${attribute}\\s*:\\s*([^;]+)`, 'i');
  const match = cssStyle.match(regex);
  return match ? match[1].trim() : null;
}

function getNumericValue(cssValue: string): string | null {
  const regex = /(\d+(\.\d+)?)/;
  const match = cssValue.match(regex);
  return match ? match[1] : null;
}

export const getPropertyFromCssStyle = (property: string, blockData: DMEData.Block) => {
  const { type, style } = blockData;
  const styleObj = getWidgetStyle(type);

  if (style) {
    if (styleObj.identifier in style) {
      const cssStyleObj = styleObj.options.find(
        (option) => option.identifier === style[styleObj.identifier],
      );
      if (!cssStyleObj?.cssStyle) {
        logger.warn('Css style is not initial!');
        return;
      }
      // css Style is: "\n       padding: 50px;\n       background: #efefef\n    "
      const { cssStyle } = cssStyleObj;
      // setting.property is property: 'settings.general.padding'
      if (property) {
        const attribute = property.split('.').pop();
        if (!attribute) return;
        const unitValue = getCssValue(cssStyle, attribute);
        if (!unitValue) return;
        const value = getNumericValue(unitValue);
        return value;
      }
    }
  } else {
    // TODO:
    logger.info('Do something in getPropertyFromCssStyle');
  }
};

export const getPropertyFromSettings = (blockData: DMEData.Block) => {
  const { type, style } = blockData;
  const styleObj = getWidgetStyle(type);

  if (style) {
    if (styleObj.identifier in style) {
      const cssStyleObj = styleObj.options.find(
        (option) => option.identifier === style[styleObj.identifier],
      );
      if (!cssStyleObj?.settings) {
        logger.warn('Css style is not initial!');
        return undefined;
      }
      return cssStyleObj.settings;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const getPropertyFromData = (property: string, blockData: DMEData.Block) => {
  const propertySchema: {
    reg: RegExp;
    handler: (property: string, data: any) => any;
  }[] = [
    {
      // eg: data.value
      reg: /^\.[a-zA-Z]+$/,
      handler: getPropertySettingsValue,
    },
    {
      // eg: data.settings.general.padding
      reg: /^settings\.general\.[a-zA-Z]+$/,
      handler: getPropertySettingsValue,
    },
    {
      // eg: data.settings.xxx
      reg: /^settings\.(?!general)[a-zA-Z]+$/,
      handler: getPropertySettingsValue,
    },
  ];

  if (!property) return undefined;

  for (let index = 0; index < propertySchema.length; index++) {
    const schema = propertySchema[index];
    if (schema.reg.test(property)) {
      return schema.handler(property, blockData);
    }
  }
  return undefined;
};

export const getPropertyValue = (property: string, blockData: DMEData.Block) => {
  return isNull(blockData.data)
    ? getPropertyFromChildren(property, blockData.children)
    : getPropertyFromData(property, blockData);
};

// scroll element to view
export const scrollBlockToView = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({
    behavior: 'smooth',
  });
};

export const imageStyleObj = (element: SlateElement, filters?: string[]) => {
  const {
    width,
    height,
    align,
    scale,
    setting: { width: settingWidth, height: settingHeight, scale: settingScale },
  } = element;

  // if filters=['width', 'height']
  // return { width: xxx, height:  xxx }
  if (filters) {
    return filters.reduce((acc, key) => {
      if (key === 'width') {
        acc.width = width ? width : settingWidth;
      } else if (key === 'height') {
        acc.height = height ? height : settingHeight;
      } else if (key === 'text-align') {
        acc.textAlign = align ? align : 'left';
      }
      return acc;
    }, {});
  }
  return {
    width: width ? `${width}px` : `${settingWidth}px`,
    height: height ? `${height}px` : `${settingHeight}px`,
    textAlign: align ? align : 'left',
    'object-fit': 'contain',
  };
};

export const imageStyleString = (element: SlateElement, filters?: string[]) => {
  const styles = imageStyleObj(element);
  return Object.keys(styles)
    .filter((key) => filters && filters.includes(key))
    .map((key) => `${key}:${styles[key]};`)
    .join('');
};
