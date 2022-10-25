import { FormatAlignCenter, FormatAlignLeft, FormatAlignLeftOutlined, FormatAlignRight, Image, ImageNotSupported, ImageOutlined, PagesOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Input, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyButton, PropertyItem } from "../utils/Property";
import { Ranger } from "../utils/Ranger";


export const BlockIframe = (props:ToolRenderProps)=>{
    const [adding, setAdding] = useState(props.adding?true:false);
    const [url, setUrl] = useState(props.data.content);
    const [width, setWidth] = useState(props.data.settings.width as number);
    const [height, setHeight] = useState(props.data.settings.height as number);    
    const [align, setAlign] = useState(props.data.settings.align?props.data.settings.align:'left');        
    const [tempUrl, setTempUrl] = useState(props.data.content);
    
    
    const submit = ()=>{
        setUrl( tempUrl );
        setAdding(false);
    }

    useEffect(()=>{
        props.onChange({...props.data, content:url, settings:{width: width, height: height, align: align} })
    }, [url, width, align, height]);

    return <div>
            {props.adding&&<div>
                <Dialog
                    open={adding}
                    onClose={props.onCancel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <DialogTitle>Input url</DialogTitle>
                    <DialogContent>
                        <Box>
                            <Input style={{width: '300px'}} onChange={e=>setTempUrl(e.target.value)} />
                            <Button onClick={submit} variant="contained">Submit</Button>
                        </Box>
                    </DialogContent>                  
                    </Dialog>
                    </div>}
            <BlockProperty title={'Iframe'} active={props.active}>
                <PropertyItem label="Width">
                    <Ranger min={300} max={1000} step={10} defaultValue={width} onChange={(v:number)=>setWidth(v)} />                    
                </PropertyItem>
                <PropertyItem label="Height">
                    <Ranger min={300} max={800} step={10} defaultValue={height} onChange={(v:number)=>setHeight(v)} />                    
                </PropertyItem>
                <PropertyItem label="Align">
                   <PropertyButton selected={align==='left'} onClick={()=>setAlign('left')}><FormatAlignLeft /></PropertyButton>               
                   <PropertyButton selected={align==='center'} onClick={()=>setAlign('center')}><FormatAlignCenter /></PropertyButton>
                   <PropertyButton selected={align==='right'} onClick={()=>setAlign('right')}><FormatAlignRight /></PropertyButton>
                </PropertyItem>
            </BlockProperty>
            {url&&<div style={{textAlign:align}}><iframe src={url} width={width} height={height}></iframe></div>}
        </div>
}

export const toolIframe:ToolDefinition = {
    type: 'iframe',
    menu:  {text:"Iframe", category:'basic',icon: <PagesOutlined /> },
    initData: {type:'iframe', content:'',
                settings:{width: 400, height: 500, align:'center'}},
    render: (props:ToolRenderProps)=><BlockIframe {...props} />
}