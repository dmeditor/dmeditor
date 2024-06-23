import { useRef, useState } from 'react';
import { InsertLinkOutlined } from '@mui/icons-material';
import { Grid, InputAdornment, Slider, styled, TextField } from '@mui/material';

import { isNumber } from '../../../utils';
import { createHandleInputChange, handleKeyDown } from './helper';

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

const PaddingStandard = (props: {
  defaultValue?: number;
  disabled?: boolean;
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (v: number | string, event: any) => void;
  onChangePaddingType: () => void;
}) => {
  const { value, onChange, min, max, step, disabled, onChangePaddingType } = props;
  const [sliderValue, setSliderValue] = useState(value);
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: Event, value: number | number[]) => {
    if (isNumber(value)) {
      onChange?.(value, e);
      setSliderValue(value);
      setCurrentValue(value);
    }
  };

  const handleInputChange = createHandleInputChange({
    min,
    max,
    onChange: (value, e) => {
      onChange?.(value, e);
      if (value !== '') {
        setCurrentValue(value);
        setSliderValue(value);
      } else {
        setCurrentValue(undefined);
        setSliderValue(undefined);
      }
    },
  });

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <CustomSlider
          disabled={disabled}
          value={sliderValue ?? 0}
          valueLabelDisplay="auto"
          step={step}
          marks
          min={min}
          max={max}
          onChange={(e: Event, v: number | Array<number>) => {
            handleChange(e, v);
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          disabled={disabled}
          value={currentValue}
          size="small"
          onBlur={handleInputChange}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const newValue = e.target.value;
            setCurrentValue(newValue ? parseInt(newValue, 10) : undefined);
          }}
          placeholder="-"
          fullWidth
          InputProps={{
            inputMode: 'numeric',
            onKeyDown: handleKeyDown,
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <InsertLinkOutlined style={{ cursor: 'pointer' }} onClick={onChangePaddingType} />
      </Grid>
    </Grid>
  );
};

export default PaddingStandard;
