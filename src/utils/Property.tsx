import { Button, ButtonProps, ButtonTypeMap, ExtendButtonBase, Grid, Tooltip } from "@mui/material"
import React from "react"

export const PropertyItem = (props:{label: string, autoWidth?:boolean, vertical?:boolean, children:any})=>{
    const autoWidth = props.autoWidth?true:false;
    const vertical = props.vertical?true:false;

    return <Grid container spacing={2} columns={12}>
    <Grid item xs={autoWidth?false:(vertical?12:3)}>
      <label style={{fontSize: '14px'}}>{props.label}</label>
    </Grid>
    <Grid item sx={{padding: 1}} xs={autoWidth?false:(vertical?12:9)}>
      {props.children}
    </Grid>
  </Grid>
}

export const PropertyGroup = (props:{header: string, children:any})=>{
    return <div>
        <div><label style={{color:'#004f00'}}>{props.header}</label></div>
        <div style={{paddingLeft: '10px', paddingTop: '10px'}}>{props.children}</div>
    </div>
}

export const PropertyButton = (props:ButtonProps&{title?:string, selected?:boolean})=>{
    let sx:any={color: '#8a8a8a', marginRight: '2px', ':hover': {
        bgcolor: '#eaeaea',
      }};

    if( props.selected ){
        sx= {...sx, 'color': 'green'};
    }


    let buttonProps = {...props};
    if( buttonProps['title'] ){
      delete buttonProps['title'];
    }

    if(props.title){
        return <Tooltip title={props.title}><Button sx={sx} {...buttonProps} /></Tooltip> 
    }else{
        return <Button sx={sx} {...props} />
    }
}