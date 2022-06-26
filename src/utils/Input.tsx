import { TextField } from "@mui/material"

export const Input = (props:{defaultValue?:any,onChange?:any})=>{
    return <TextField defaultValue={props.defaultValue} size="small" hiddenLabel variant="outlined" onChange={(e)=>props.onChange(e.target.value)} />
}