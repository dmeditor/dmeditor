export const UNDEFINED_VALUE = '-';
export type TYPE_UNDEFINED_VALUE = typeof UNDEFINED_VALUE;

export type PaddingType = 'standard' | 'symmetric' | 'separate';
export type ValidInputValue = number | undefined;
export type InputChangingValue = number | '' | TYPE_UNDEFINED_VALUE;

export type PaddingChangingValue = {
  top: InputChangingValue;
  right: InputChangingValue;
  bottom: InputChangingValue;
  left: InputChangingValue;
};

export type PaddingSeparateValue = {
  top: ValidInputValue;
  right: ValidInputValue;
  bottom: ValidInputValue;
  left: ValidInputValue;
};

export interface PaddingStandardProps {
  defaultValue?: number;
  disabled?: boolean;
  value?: number | undefined;
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number | string) => void;
  onChangePaddingType: () => void;
}
