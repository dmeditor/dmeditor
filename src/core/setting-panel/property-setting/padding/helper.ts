import { UNDEFINED_VALUE, type PaddingSeparateProps, type TYPE_UNDEFINED_VALUE } from './types';

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(event.key)) {
    return;
  }

  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
};

export interface HandleInputKeyboardParams {
  min: number;
  max: number;
  onKeyDown: (
    value: number | TYPE_UNDEFINED_VALUE,
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
    position?: 'top' | 'right' | 'bottom' | 'left',
  ) => void;
}

export const createHandleInputKeyDown = ({ min, max, onKeyDown }: HandleInputKeyboardParams) => {
  return (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(event.key)) {
      if (event.key === 'Enter') {
        const input = event.target as HTMLInputElement | null;

        if (input) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value',
          )?.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(input, input.value);

            const inputEvent = new Event('input', { bubbles: true });
            input.dispatchEvent(inputEvent);

            event.preventDefault();
            let value = inputConverted(input.value);
            if (value === UNDEFINED_VALUE) {
              onKeyDown?.(UNDEFINED_VALUE, event);
            } else {
              if (value < min) {
                value = min;
              }
              if (value > max) {
                value = max;
              }
              if (isNaN(value)) {
                onKeyDown?.(UNDEFINED_VALUE, event);
              } else {
                onKeyDown?.(value, event);
              }
            }
          }
        }
      } else {
        return;
      }
    }
    if (!/^[0-9-]$/.test(event.key)) {
      event.preventDefault();
    }
  };
};

export interface HandleInputChangeParams {
  min: number;
  max: number;
  onChange: (
    value: number | '',
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    position?: 'top' | 'right' | 'bottom' | 'left',
  ) => void;
}

export const createHandleInputChange = ({ min, max, onChange }: HandleInputChangeParams) => {
  return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    const regex = /^[0-9-]*$/;
    if (!regex.test(newValue)) {
      e.preventDefault();
      return false;
    } else {
      let value = parseInt(e.target.value, 10);
      if (value < min) {
        value = min;
      }
      if (value > max) {
        value = max;
      }
      if (isNaN(value)) {
        onChange?.('', e);
      } else {
        onChange?.(value, e);
      }
    }
  };
};

export const convertedPaddingValue = (
  value: number | string | null | undefined,
  type: 'input' | 'slider' = 'input',
): number | TYPE_UNDEFINED_VALUE | undefined => {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    const num = parseFloat(value);
    return isNaN(num) ? (type === 'input' ? UNDEFINED_VALUE : undefined) : num;
  }
  return type === 'input' ? UNDEFINED_VALUE : undefined;
};

export const convertedPaddingSeparateValue = (values: PaddingSeparateProps['value']) => {
  if (!values || !Array.isArray(values)) {
    return [];
  }
  return values?.map((value) => convertedPaddingValue(value));
};

export function inputConverted(value: number | string | null): number | TYPE_UNDEFINED_VALUE {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? UNDEFINED_VALUE : parsedValue;
  }
  return UNDEFINED_VALUE;
}

export const setChangingValue = (value: string) => {
  if (value === UNDEFINED_VALUE) {
    return UNDEFINED_VALUE;
  }
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? '' : parsedValue;
};
