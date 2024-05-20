'use strict';

import { DMEData } from '../types';

function jsonParse<T>(obj: string): T {
  try {
    return JSON.parse(obj);
  } catch (e) {
    throw new Error('jsonParse error');
  }
}

function jsonStringify<T>(obj: T): string {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    throw new Error('jsonStringify error');
  }
}

// simple clone deep
function simpleCloneDeep<T>(obj: T): unknown {
  if (obj === null) return null;
  if (obj === undefined) return undefined;
  return jsonParse(jsonStringify(obj));
}

function isHTMLElement(node: unknown): node is HTMLElement {
  // return node instanceof HTMLElement;
  return (node as HTMLElement).innerText !== undefined;
}

function isStrictlyInfinity(value: number): value is typeof Infinity {
  return value === Infinity || value === -Infinity;
}

/**
 * @method isNull
 * @param value
 * @returns {boolean} true if value is null
 */
function isNull(value: unknown): value is null {
  return value === null;
}

function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * @method isUndefinedOrNull
 * @param {unknown} value
 * @returns {boolean} true if value is undefined or null
 *                    false if value is not undefined or null
 **/
function isUndefinedOrNull(value: unknown): value is boolean {
  return isNull(value) || isUndefined(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && value.constructor === Object;
}

/**
 * @method isKeyInObject
 * @param {string} key - key to check
 * @param {object} obj - object to check
 * @returns {boolean} true if key is in object
 */
function isKeyInObject<T, K extends keyof T>(key: string, obj: T): obj is T & Record<K, unknown> {
  if (isPlainObject(obj)) {
    return key in obj;
  }
  return false;
}

function getPropertyName(name: string) {
  if (name.startsWith('settings.')) {
    return name.replace('settings.', '');
  } else if (name.startsWith('.')) {
    return name.replace('.', '');
  } else {
    throw new Error(`Invalid property name: ${name}`);
  }
}

function getPropertyValue(name: string, obj: DMEData.Block['data']): unknown {
  if (name.startsWith('settings.')) {
    if (name.startsWith('settings.general.')) {
      return obj?.settings?.general?.[name.split('.')[2]];
    } else {
      return obj?.['settings']?.[getPropertyName(name)];
    }
  } else if (name.startsWith('.')) {
    return obj[getPropertyName(name)];
  } else {
    throw new Error(`Invalid property name: ${name}`);
  }
}

function getPropertyChildren(name: string, obj: DMEData.Block['children']): unknown {
  if (name.startsWith('.')) {
    if (Array.isArray(obj)) {
      return obj;
    } else {
      console.warn('Invalid property children');
      return [];
    }
  } else {
    throw new Error(`Invalid property name: ${name}`);
  }
}

/*
 * @method isEmptyString
 * @param {string} value
 * @returns {boolean} true if value is empty string
 *                    false if value is not empty string
 */
function isEmptyString(value: string): boolean {
  return value === '';
}

/**
 * @method imageExtensionIsValid
 * @param extension string image extension
 * @returns boolean true if extension is valid
 */
function imageExtensionIsValid(extension: string | undefined): boolean {
  if (!extension) return false;
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension);
}

/**
 * @method isUrl
 * @param url string url to check
 * @returns boolean true if url is valid
 */
function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * @method isString
 * @param value
 * @returns {boolean} true if value is string
 *                   false if value is not string
 * */
function isString(value: unknown): Boolean {
  return (
    typeof value === 'string' ||
    value instanceof String ||
    Object.prototype.toString.call(value) === '[object String]'
  );
}

export {
  getPropertyName,
  getPropertyValue,
  getPropertyChildren,
  simpleCloneDeep,
  jsonParse,
  jsonStringify,
  isHTMLElement,
  isStrictlyInfinity,
  isNull,
  isNumber,
  isUndefined,
  isUndefinedOrNull,
  isKeyInObject,
  isEmptyString,
  imageExtensionIsValid,
  isUrl,
  isString,
};
