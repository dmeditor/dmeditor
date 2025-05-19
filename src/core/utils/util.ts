'use strict';

import { ContextWithStyleType, dmeConfig, type DMEConfigType } from '../config';
import type { DMEData } from '../types';
import { logger } from './log';
import { getWidgetStyle, getWidgetWithVariant } from './register';

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
  if (element) {
    let scrollTop = false;
    //scrollTop only when it's too height
    if (element.getBoundingClientRect().height >= window.innerHeight) {
      scrollTop = true;
    }
    element.scrollIntoView({
      behavior: 'smooth',
      block: scrollTop ? 'start' : 'center',
    });
  }
};

export const arrayHasCommonElement = (a: Array<unknown>, b: Array<unknown>) => {
  for (const i of a) {
    for (const j of b) {
      if (i === j) {
        return true;
      }
    }
  }
  return false;
};

export const arrayStarts = (a: Array<unknown>, b: Array<unknown>) => {
  if (a.length < b.length) {
    return false;
  }
  for (let i = 0; i <= a.length - 1; i++) {
    if (i <= b.length - 1) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
  }
  return true;
};

export const getEmbedConfigObject = (rootWidget: string) => {
  const [def] = getWidgetWithVariant(rootWidget);
  if (def?.events.embedConfig) {
    return def.events.embedConfig;
  }
  return null;
};

export const editorConfigConverted = (str: string): keyof DMEConfigType['editor'] => {
  return str.replace(/-([a-z])/g, (_, letter) =>
    letter.toUpperCase(),
  ) as keyof DMEConfigType['editor'];
};

export const mapBlockList = (
  children: DMEData.BlockList | DMEData.BlockMap,
  fn: (item: DMEData.Block, index: number | string) => any,
) => {
  if (Array.isArray(children)) {
    return children.map(fn);
  } else {
    const result: any[] = [];
    Object.keys(children).map(function (key: string) {
      result.push(fn(children[key], key));
    });
    return result;
  }
};

export const getConfigByPath = (path: string) => {
  const arr = path.split('/');
  let temp = dmeConfig as any;
  for (const item of arr) {
    temp = temp[item];
  }
  return temp;
};

export const updateLocation = (vars: any) => {
  let url = new URL(document.location.toString());
  const params = url.searchParams;
  for (const item of Object.keys(vars)) {
    if (!item.startsWith('_')) {
      params.set(item, vars[item] + '');
    }
  }
  history.pushState({}, null, url);
};

export const queryFromLocaton = (location: string) => {
  const result: Record<string, string> = {};
  if (location.startsWith('?')) {
    const str = location.substring(1);
    const arr = str.split('&');
    for (const item of arr) {
      const params = item.split('=');
      if (params.length === 2) {
        result[params[0]] = params[1];
      }
    }
  }
  return result;
};

// path: 'hero-text:_:default/list[list]:_:default/'
export const matchContext = (context: ContextWithStyleType, path: string) => {
  return true;
};

export const convertStyleDataToArray = (styles?: Record<string, string>) => {
  const result: Array<string> = [];
  if (styles) {
    for (const key of Object.keys(styles)) {
      const value = styles[key];
      result.push(key + ':' + value);
    }
  }
  return result;
};

export const setBlockValueByPath = (block: any, propName: string, propValue: any) => {
  const [propKey, realPropsName, realPropsName2] = propName.split('.');
  if (isEmptyString(propKey)) {
    if (isPlainObject(block.data)) {
      block['data'][realPropsName] = propValue;
    } else {
      console.warn('data is not an object');
    }
  } else if (propKey === '/dependency') {
    block['dependency'] = propValue;
  } else if (propKey === 'settings') {
    if (isPlainObject(block.data)) {
      if (isKeyInObject('settings', block.data)) {
        if (realPropsName === 'general') {
          console.log(realPropsName, realPropsName2);
          if (isKeyInObject('general', block.data.settings)) {
            block.data.settings.general[realPropsName2] = propValue;
          } else {
            console.log(realPropsName, realPropsName2, 22);
            block.data[propKey][realPropsName] = { [realPropsName2]: propValue };
          }
        } else {
          block.data[propKey][realPropsName] = propValue;
        }
      } else {
        if (realPropsName === 'general') {
          block.data[propKey] = { general: { [realPropsName2]: propValue } };
        } else {
          const settings = { [realPropsName]: propValue };
          block.data[propKey] = settings;
        }
      }
    } else {
      console.warn('settings is not an object');
    }
  } else {
    console.error(
      `Invalid propName: ${propName}, it should be "settings.${propName}" or ".${propName}"`,
    );
  }
};
