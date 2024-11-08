import { useState } from 'react';
import { Tune } from '@mui/icons-material';
import { Button, Grid, InputAdornment, Slider, styled, TextField } from '@mui/material';

import { isNumber } from '../../../utils';
import { InputHandler } from './handlers/InputHandler';
import { SliderHandler } from './handlers/SliderHandler';
import { createHandleInputChange, createHandleInputKeyDown, setChangingValue } from './helper';
import { TYPE_UNDEFINED_VALUE, UNDEFINED_VALUE, type PaddingStandardProps } from './types';

const CustomSlider = styled(Slider)(() => ({
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

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    paddingRight: '5px',
  },

  '& .MuiInputBase-input': {
    padding: '8px 6px',
    fontSize: '0.8rem',
  },
  '& .MuiInputAdornment-root': {
    marginLeft: '0px',
  },
  '& .MuiInputAdornment-root p': {
    fontSize: '0.8rem',
  },
});

const PaddingStandard: React.FC<PaddingStandardProps> = (props) => {
  const { value, onChange, min, max, step, disabled, onChangePaddingType } = props;
  const [inputHandler] = useState(() => new InputHandler());
  const [sliderHandler] = useState(() => new SliderHandler());

  const [sliderValue, setSliderValue] = useState(value);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (isNumber(value)) {
      onChange?.(value);
      setSliderValue(value);
      setCurrentValue(value);
    }
  };

  const handleInputBlur = createHandleInputChange({
    min,
    max,
    onChange: (value, _) => {
      onChange?.(value);
      inputHandler.value = value;
      sliderHandler.value = value;
      setCurrentValue(inputHandler.value);
      setSliderValue(sliderHandler.value);
    },
  });

  const handleKeyDown = createHandleInputKeyDown({
    min,
    max,
    onKeyDown: (value, _) => {
      onChange?.(value);
      inputHandler.value = value;
      sliderHandler.value = value;
      setCurrentValue(inputHandler.value);
      setSliderValue(sliderHandler.value);
    },
  });

  const customSliderValue =
    sliderValue === UNDEFINED_VALUE || sliderValue === undefined ? 0 : sliderValue;
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs>
        <CustomSlider
          disabled={disabled}
          value={customSliderValue}
          valueLabelDisplay="auto"
          step={step}
          marks
          min={min}
          max={max}
          onChange={(e: Event, v: number | Array<number>) => {
            handleSliderChange(e, v);
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField
          disabled={disabled}
          value={currentValue}
          size="small"
          onBlur={handleInputBlur}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const {
              target: { value },
            } = e;
            setCurrentValue(setChangingValue(value) as number | TYPE_UNDEFINED_VALUE);
          }}
          fullWidth
          InputProps={{
            inputMode: 'numeric',
            onKeyDown: handleKeyDown,
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button size="small" title="Advanced mode" color="inherit" onClick={onChangePaddingType}>
          <Tune />
        </Button>
      </Grid>
    </Grid>
  );
};

export default PaddingStandard;
