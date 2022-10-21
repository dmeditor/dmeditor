import { Button, ButtonProps, ButtonTypeMap, ExtendButtonBase, Grid, Tooltip } from "@mui/material"
import React from "react"

export const PropertyItem = (props:{label: string, vertical?:boolean, children:any})=>{
    return <Grid container spacing={2} columns={12}>
    <Grid item xs={props.vertical?12:3}>
      <label>{props.label}</label>
    </Grid>
    <Grid item sx={{padding: 1}} xs={props.vertical?12:9}>
      {props.children}
    </Grid>
  </Grid>
}

export const PropertyButton = (props:ButtonProps&{title?:string})=>{
    if(props.title){
        return <Tooltip title={props.title}><Button {...props} /></Tooltip> 
    }else{
        return <Button {...props} />
    }
}