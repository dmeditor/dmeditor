export class SliderHandler {
  private _value: number | undefined;

  constructor(initialValue: number | string | null = null) {
    this._value = this.convertToNumber(initialValue);
  }

  private convertToNumber(value: number | string | null): number | undefined {
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }

  public set value(input: number | string | null) {
    this._value = this.convertToNumber(input);
  }

  public get value(): number | undefined {
    return this._value;
  }
}
