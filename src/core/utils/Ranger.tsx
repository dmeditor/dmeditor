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
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (v: number, event: any) => void;
  onFinish?: (v: number) => void;
}) => {
  const { value, onChange, min, max, defaultValue } = props;
  const handleChange = (e: Event, value: number | number[]) => {
    onChange?.(value as number, e);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange?.(parseInt(e.target.value, 10), e);
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <CustomSlider
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
      <Grid item>
        <Input
          value={value ? value : defaultValue}
          size="small"
          onChange={handleInputChange}
          inputProps={{
            min,
            max,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
    </Grid>
  );
};
