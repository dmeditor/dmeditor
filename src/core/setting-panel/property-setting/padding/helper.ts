export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
    return;
  }
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
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
    const regex = /^[0-9]*$/;
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
