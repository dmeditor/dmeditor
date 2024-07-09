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


  return (
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
  );
};
