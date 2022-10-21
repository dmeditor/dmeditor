import { Button, ButtonProps, ButtonTypeMap, ExtendButtonBase, Grid, Tooltip } from "@mui/material"
import React from "react"

export const PropertyItem = (props:{label: string, autoWidth?:boolean, vertical?:boolean, children:any})=>{
    const autoWidth = props.autoWidth?true:false;
    const vertical = props.vertical?true:false;

    return <Grid container spacing={2} columns={12}>
    <Grid item xs={autoWidth?false:(vertical?12:3)}>
      <label>{props.label}</label>
    </Grid>
    <Grid item sx={{padding: 1}} xs={autoWidth?false:(vertical?12:9)}>
      {props.children}
    </Grid>
  </Grid>
}

export const PropertyButton = (props:ButtonProps&{title?:string})=>{
    const sx={color: '#666666', ':hover': {
        bgcolor: '#eaeaea',
      }};

    if(props.title){
        return <Tooltip title={props.title}><Button sx={sx} {...props} /></Tooltip> 
    }else{
        return <Button sx={sx} {...props} />
    }
}