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
  hideValueLabel?: boolean;
  reverse?: boolean;
  labelFormat?: string;
  onChange?: (v: number | string, event: any) => void;
  onFinish?: (v: number) => void;
}) => {
  const { value, onChange, min, max, defaultValue, disabled, reverse, labelFormat } = props;

  const formatLabel = (v: number) =>
    labelFormat ? labelFormat.replace('{value}', String(v)) : String(v);

  // When reversed, flip the value so right = smaller number (e.g. h1)
  const toSlider = (v: number) => (reverse ? max + min - v : v);
  const fromSlider = (v: number) => (reverse ? max + min - v : v);

  const handleChange = (e: Event, sliderValue: number | number[]) => {
    onChange?.(fromSlider(sliderValue as number), e);
  };

  const sliderValue = value != null ? toSlider(value) : toSlider(defaultValue ?? 0);
  const sliderDefault = toSlider(defaultValue ?? 0);

  return (
    <CustomSlider
      disabled={disabled}
      defaultValue={sliderDefault}
      valueLabelDisplay={props.hideValueLabel ? 'off' : 'auto'}
      valueLabelFormat={(v) => formatLabel(fromSlider(v))}
      step={props.step}
      marks
      value={sliderValue}
      min={min}
      max={max}
      onChange={(e: Event, v: number | Array<number>) => {
        handleChange(e, v);
      }}
      onChangeCommitted={(e: any, v: number | Array<number>) => {
        if (props.onFinish) {
          props.onFinish(fromSlider(v as number));
        }
      }}
    />
  );
};
