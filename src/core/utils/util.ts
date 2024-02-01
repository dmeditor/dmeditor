'use strict';

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
  if (name.startsWith('setting.')) {
    return name.replace('setting.', '');
  } else {
    throw new Error(`Invalid property name: ${name}`);
  }
}

export {
  getPropertyName,
  simpleCloneDeep,
  jsonParse,
  jsonStringify,
  isHTMLElement,
  isStrictlyInfinity,
  isNull,
  isUndefined,
  isUndefinedOrNull,
  isKeyInObject,
};
