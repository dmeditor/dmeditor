import { TextField } from "@mui/material"

export const Input = (props:{onChange?:any})=>{
    return <TextField size="small" hiddenLabel variant="outlined" onChange={(e)=>props.onChange(e.target.value)} />
}