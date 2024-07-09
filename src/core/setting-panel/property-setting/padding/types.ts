export const UNDEFINED_VALUE = '-';
export type TYPE_UNDEFINED_VALUE = typeof UNDEFINED_VALUE;

export type PaddingType = 'standard' | 'symmetric' | 'separate';
export type ValidInputValue = number | undefined | TYPE_UNDEFINED_VALUE | '';

export type PaddingSeparateValue = {
  top: ValidInputValue;
  right: ValidInputValue;
  bottom: ValidInputValue;
  left: ValidInputValue;
};

export interface PaddingStandardProps {
  defaultValue?: number;
  disabled?: boolean;
  value?: number | undefined | TYPE_UNDEFINED_VALUE;
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number | string) => void;
  onChangePaddingType: () => void;
}

export interface PaddingSeparateProps extends PaddingStandardProps {
  onChange?: (value: number | string | PaddingSeparateValue) => void;
}
