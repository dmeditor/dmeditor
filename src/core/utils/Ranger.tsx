import { makeStyles, Slider, Stack, styled } from '@mui/material';

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
  return (
    <CustomSlider
      defaultValue={props.defaultValue || 0}
      valueLabelDisplay="auto"
      step={props.step}
      marks
      value={props.value ? props.value : props.defaultValue || 0}
      min={props.min}
      max={props.max}
      onChange={(e: any, v: number | Array<number>) => {
        if (props.onChange) {
          props.onChange(v as number, e);
        }
      }}
      onChangeCommitted={(e: any, v: number | Array<number>) => {
        if (props.onFinish) {
          props.onFinish(v as number);
        }
      }}
    />
  );
};
