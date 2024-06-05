import { Grid, Input, Slider, styled } from '@mui/material';

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

export const Ranger = (props: {
  defaultValue?: number;
  disabled?: boolean;
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (v: number | string, event: any) => void;
  onFinish?: (v: number) => void;
}) => {
  const { value, onChange, min, max, defaultValue, disabled } = props;

  const handleChange = (e: Event, value: number | number[]) => {
    onChange?.(value as number, e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <CustomSlider
          disabled={disabled}
          defaultValue={props.defaultValue || 0}
          valueLabelDisplay="auto"
          step={props.step}
          marks
          value={value ? value : props.defaultValue || 0}
          min={min}
          max={max}
          onChange={(e: Event, v: number | Array<number>) => {
            handleChange(e, v);
          }}
          onChangeCommitted={(e: any, v: number | Array<number>) => {
            if (props.onFinish) {
              props.onFinish(v as number);
            }
          }}
        />
      </Grid>
      {/* <Grid item xs={2}>
        <Input
          disabled={disabled}
          value={value ? value : defaultValue}
          size="small"
          onChange={handleInputChange}
          placeholder="-"
          inputProps={{
            // min,
            // max,
            // type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid> */}
    </Grid>
  );
};
