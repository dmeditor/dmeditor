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
    parameters: {
      min: number;
      max: number;
      step?: number;
      allowedUnit?: 'px' | '%';
      defaultUnit?: '%' | 'px';
    };
    disabled?: boolean;
  },
) => {
  const { value, disabled, parameters, blockPath, property } = props;

  const canSelectUnit = !parameters.allowedUnit;

  const getInputType = () => {
    if (!canSelectUnit) {
      return parameters.allowedUnit;
    }
    if (typeof value === 'string' && value.endsWith('%')) {
      return '%';
    } else if (typeof value === 'number') {
      return 'px';
    } else if (value === undefined && parameters.defaultUnit) {
      return parameters.defaultUnit;
    } else {
      return 'px';
    }
  };

  const { updateBlockPropsByPath } = useEditorStore();

  const [inputType, setInputType] = useState(() => getInputType());

  const convertPropsValue = (v: string | number | undefined) => {
    if (value === undefined) {
      return undefined;
    }
    if (inputType === '%') {
      return parseInt(value as string);
    } else {
      return value as number;
    }
  };

  const [rangeValue, setRangeValue] = useState<number | undefined>(() => {
    return convertPropsValue(value);
  });

  useEffect(() => {
    const rangeValue = convertPropsValue(props.value);
    setRangeValue(rangeValue);
    setInputValue(convertRangeValueToInput(rangeValue));
  }, [props.value]);

  const convertRangeValueToInput = (v?: number) => {
    return v ? v : '-'; // 0 is also to '-'
  };

  const [inputValue, setInputValue] = useState<TypeNumberInputValue>(() =>
    convertRangeValueToInput(rangeValue),
  );

  const changeUnit = (unit: unitType) => {
    setInputType(unit);
    setRangeValue(undefined);
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
    if (!change) {
      setInputValue(v);
    } else {
      if (v === '-' || v === '') {
        setInputValue('-');
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
      <Grid item xs={canSelectUnit ? 2 : 3}>
        <NumberInput
          value={inputValue}
          endString={canSelectUnit ? undefined : 'px'}
          onChange={(v, change) => inputHandler(v, change)}
        />
      </Grid>
      {canSelectUnit && (
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
      )}
    </Grid>
  );
};

export default Width;
