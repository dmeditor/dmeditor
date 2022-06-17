import { Slider, Stack } from "@mui/material"

export const Ranger=(props:{defaultValue:number ,min:number, max: number, step: number, onChange:any})=>{
    return <Stack spacing={props.defaultValue} direction="row" sx={{ mb: 1 }} alignItems="center">
    <Slider aria-label="Temperature"
  defaultValue={props.defaultValue}
  valueLabelDisplay="auto"  step={props.step}
  marks
  min={props.min}
  max={props.max}
  onChange={(e:any)=>props.onChange(e.target.value)}
  />
  </Stack>

}