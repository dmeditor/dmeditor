import { useEffect, useState } from 'react';
import { InputAdornment, styled, TextField } from '@mui/material';

import { createHandleInputChange, createHandleInputKeyDown, setChangingValue } from './helper';
import { InputHandler } from './InputHandler';
import { TYPE_UNDEFINED_VALUE, UNDEFINED_VALUE } from './types';

export type TypeNumberInputValue = number | '' | '-';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    padding: '8px 5px',
    fontSize: '0.8rem',
  },
});

export const NumberInput = (props: {
  disabled?: boolean;
  value: TypeNumberInputValue;
  min?: number;
  max?: number;
  onChange: (v: TypeNumberInputValue, change?: boolean) => void;
}) => {
  const { value, min = 0, max = 2000, disabled } = props;

  const onChangeHandle = (v: TypeNumberInputValue, isBlur?: boolean) => {
    props.onChange(v, isBlur);
  };

  const handleInputBlur = createHandleInputChange({
    min,
    max,
    onChange: (value, _) => {
      onChangeHandle(value, true);
    },
  });

  const handleKeyDown = createHandleInputKeyDown({
    min,
    max,
    onKeyDown: (value, _) => {
      //todo: debounce this
      // onChangeHandle(value);
    },
  });

  return (
    <StyledTextField
      disabled={disabled}
      value={value}
      size="small"
      onBlur={handleInputBlur}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {
          target: { value },
        } = e;
        onChangeHandle(setChangingValue(value) as number | TYPE_UNDEFINED_VALUE);
      }}
      fullWidth
      InputProps={{
        inputMode: 'numeric',
        onKeyDown: handleKeyDown,
      }}
    />
  );
};
