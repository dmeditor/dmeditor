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

export { simpleCloneDeep, jsonParse, jsonStringify, isHTMLElement, isStrictlyInfinity };
