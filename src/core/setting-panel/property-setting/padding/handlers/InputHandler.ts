import { inputConverted } from '../helper';
import { type TYPE_UNDEFINED_VALUE } from '../types';

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
