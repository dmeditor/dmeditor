import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/css';
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  styled,
  TextField,
} from '@mui/material';

import { DME, useEditorStore } from '../../../../';

type DistanceParam = {
  unit?: Array<'px' | '%'>;
  max?: number;
  min?: number;
  range?: boolean;
  disabled?: boolean;
  step?: number;
};

const inputStyle = css`
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const selectStyle = css`
  padding: 0;
`;

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    width: 18,
    height: 18,
  },
  '& .MuiSlider-track': {
    height: 2,
  },
  '& .MuiSlider-rail': {
    height: 2,
  },
}));

const UNSET_VALUE = undefined;

const destructDistance = (distance: string | number | typeof UNSET_VALUE) => {
  if (distance === UNSET_VALUE) {
    return { num: UNSET_VALUE, unit: 'px' };
  }

  const num = Number(distance);
  const unit = distance.toString().replace(num.toString(), '');

  return { num, unit };
};

export default function Distance(
  props: { value?: string | number; property: string } & DME.SettingComponentProps,
) {
  const { property, value, blockPath, parameters } = props;
  const { min, max, unit = ['px'], range = true, step } = parameters as DistanceParam;
  const { updateBlockPropsByPath } = useEditorStore();
  const { num, unit: unitVal } = destructDistance(value);

  const [unitValue, setUnitValue] = useState<string>(unitVal || unit[0]);
  const [localValue, setLocalValue] = useState<number | undefined>(num);

  const isSingleUnit = unit.length === 1;

  const minMax = useMemo(() => {
    if (unitValue !== '%') {
      return [min, max];
    }

    return [0, 100];
  }, [unitValue]);

  const handleChange = (value: any) => {
    setLocalValue(value);
  };
  const handleSliderChange = (_evt: Event, value: number | number[]) => {
    setLocalValue(value as number);
    updateDistance(value, unitValue);
  };

  const handleUnitChange = (evt: SelectChangeEvent<{ value: unknown }>) => {
    setUnitValue(evt.target.value as string);
  };
  const handleBlur = useCallback(() => {
    const [min = Number.MIN_VALUE, max = Number.MAX_VALUE] = minMax;
    let tempValue = localValue;

    if (tempValue === UNSET_VALUE) {
      return;
    }

    if (tempValue < min) {
      tempValue = min;
    } else if (tempValue > max) {
      tempValue = max;
    }

    setLocalValue(tempValue);
    updateDistance(tempValue, unitValue);
  }, [minMax, localValue]);

  const updateDistance = (value: any, unit: any) => {
    const distance = `${value}${unit}`;
    updateBlockPropsByPath(blockPath, property, distance);
  };

  useEffect(() => {
    handleBlur();
  }, [unitValue]);

  return (
    <Grid container spacing={1} alignItems="center">
      {range ? (
        <Grid item xs={4}>
          <CustomSlider
            step={step}
            marks
            value={localValue || 0}
            min={minMax[0]}
            max={minMax[1]}
            onChange={handleSliderChange}
          />
        </Grid>
      ) : null}
      <Grid item xs={4} spacing={1}>
        <TextField
          className={inputStyle}
          size="small"
          type="number"
          value={localValue}
          onChange={(evt) => handleChange(evt.target.value)}
          placeholder="-"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={2}>
        {isSingleUnit ? (
          unit[0]
        ) : (
          <Select
            value={unitValue as any}
            className={selectStyle}
            size="small"
            onChange={handleUnitChange}
          >
            {unit?.map((u) => <MenuItem value={u}>{u}</MenuItem>)}
          </Select>
        )}
      </Grid>
    </Grid>
  );
}
