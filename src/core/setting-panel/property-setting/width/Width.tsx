import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Grid, Input, MenuItem, Select, styled, TextField } from '@mui/material';
import { useEditorStore } from 'dmeditor/core/main/store';
import { DME } from 'dmeditor/core/types';
import {
  NumberInput,
  TypeNumberInputValue,
} from 'dmeditor/core/utility/settings/number-input/NumberInput';

import { Ranger } from '../../../utils';

type unitType = 'px' | '%';

const StyledSelect = styled(Select)({
  '&': {
    fontSize: '0.8rem',
  },
  '& .MuiInputBase-input': {
    padding: '8px 8px',
  },
});

const Width = (
  props: DME.SettingComponentProps & {
    property: string;
    value?: number | string;
    parameters: { min: number; max: number; step?: number };
    disabled?: boolean;
  },
) => {
  const { value, disabled, parameters, blockPath, property } = props;

  const getInputType = () => {
    if (typeof value === 'string' && value.endsWith('%')) {
      return '%';
    } else if (typeof value === 'number') {
      return 'px';
    } else {
      return 'px';
    }
  };

  const { updateBlockPropsByPath } = useEditorStore();

  const [inputType, setInputType] = useState(() => getInputType());
  const [rangeValue, setRangeValue] = useState<number | undefined>(() => {
    if (value === undefined) {
      return undefined;
    }
    if (inputType === '%') {
      return parseInt(value as string);
    } else {
      return value as number;
    }
  });

  const convertRangeValueToInput = (v?: number) => {
    return v === undefined ? '-' : v;
  };

  const [inputValue, setInputValue] = useState<TypeNumberInputValue>(() =>
    convertRangeValueToInput(rangeValue),
  );

  const changeUnit = (unit: unitType) => {
    setInputType(unit);
    if (unit === '%' && (rangeValue === undefined || rangeValue > 100)) {
      setRangeValue(100);
    }
  };

  useEffect(() => {
    handleChange();
    setInputValue(convertRangeValueToInput(rangeValue));
  }, [rangeValue, inputType]);

  const handleChange = () => {
    if (inputType === 'px') {
      updateBlockPropsByPath(blockPath, property, rangeValue);
    } else if (inputType === '%') {
      updateBlockPropsByPath(blockPath, property, rangeValue ? rangeValue + '%' : undefined);
    }
  };

  const inputHandler = (v: TypeNumberInputValue, change?: boolean) => {
    setInputValue(v);
    if (change) {
      if (v === '-' || v === '') {
        setRangeValue(undefined);
      } else if (typeof v === 'number') {
        setRangeValue(v);
      }
    }
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs>
        {(inputType === 'px' || !inputType) && (
          <Ranger
            disabled={disabled}
            value={rangeValue}
            min={parameters.min === undefined ? 1 : parameters.min}
            max={parameters?.max || 5}
            step={parameters?.step || 1}
            onChange={(v) => setRangeValue(v as number)}
          ></Ranger>
        )}
        {inputType === '%' && (
          <Ranger
            disabled={disabled}
            value={rangeValue && rangeValue > 100 ? 50 : rangeValue}
            min={0}
            max={100}
            step={1}
            onChange={(v) => setRangeValue(v as number)}
          ></Ranger>
        )}
      </Grid>
      <Grid item xs={2}>
        <NumberInput value={inputValue} onChange={(v, change) => inputHandler(v, change)} />
      </Grid>
      <Grid item xs={3}>
        <StyledSelect
          value={inputType}
          fullWidth
          onChange={(e) => {
            const unit = e.target.value;
            changeUnit(unit as unitType);
          }}
          size="small"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="%">%</MenuItem>
          <MenuItem value="px">px</MenuItem>
        </StyledSelect>
      </Grid>
    </Grid>
  );
};

export default Width;
