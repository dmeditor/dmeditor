import { UNDEFINED_VALUE, type TYPE_UNDEFINED_VALUE } from '../types';

export function inputConverted(value: number | string | null): number | TYPE_UNDEFINED_VALUE {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    const num = parseFloat(value);
    return isNaN(num) ? UNDEFINED_VALUE : num;
  }
  return UNDEFINED_VALUE;
}

export class InputHandler {
  private _value: number | TYPE_UNDEFINED_VALUE;

  constructor(initialValue: number | string | null = null) {
    this._value = this.convertToValidValue(initialValue);
  }

  private convertToValidValue(value: number | string | null): number | TYPE_UNDEFINED_VALUE {
    return inputConverted(value);
  }

  public set value(input: number | string | null) {
    this._value = this.convertToValidValue(input);
  }

  public get value(): number | TYPE_UNDEFINED_VALUE {
    return this._value;
  }
}

export class InputManager {
  private handlers: Map<string, InputHandler>;

  constructor() {
    this.handlers = new Map();
  }

  public setValue(id: string, value: number | string | null) {
    let handler = this.handlers.get(id);
    if (!handler) {
      handler = new InputHandler(value);
      this.handlers.set(id, handler);
    } else {
      handler.value = value;
    }
  }

  public getValue(id: string): number | TYPE_UNDEFINED_VALUE {
    const handler = this.handlers.get(id);
    return handler ? handler.value : UNDEFINED_VALUE;
  }
}
