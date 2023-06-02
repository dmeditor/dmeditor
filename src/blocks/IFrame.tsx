import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight, PagesOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { CommonSettings } from "../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyButton, PropertyItem,Ranger,Util, useGetDevice } from "../utils";
import { TemplateSettings } from "../templates/TemplateSettings";
import { getCommonBlockCss, getTemplateCss } from "../Block";

export const BlockIframe = (props:ToolRenderProps)=>{
    const [adding, setAdding] = useState(props.adding?true:false);
    const [url, setUrl] = useState(props.data.data);
    const [width, setWidth] = useState(props.data.settings.width as number);
    const [height, setHeight] = useState(props.data.settings.height as number);    
    const [align, setAlign] = useState(props.data.settings.align?props.data.settings.align:'left');        
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const [template, setTemplate] = useState(props.data.template);
    
    const isMobile = useGetDevice() === 'mobile';
    
    const submit = (val:any,type:string)=>{
        setUrl( val );
        setAdding(false);
    }

    useEffect(()=>{
        props.onChange({...props.data, data:url, settings:{width: width, height: height, align: align}, common: commonSettings, template:template })
    }, [url, width, align, height, commonSettings, template]);

    return <div className={getCommonBlockCss('iframe', template)}>
            {adding&&<div>
              <Util.renderBroseURL type={'IFrame'} onConfirm={submit} adding={adding} />
            </div>}
            {props.active&&<BlockProperty  blocktype="iframe" inBlock={props.inBlock}>
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
              {Util.renderCustomProperty(props.data)}
              <TemplateSettings template={props.data.template||''} blocktype='iframe' onChange={(identifier:string)=>setTemplate( identifier)} />
              <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>setCommonSettings(settings)} onDelete={props.onDelete}/></div>
            </BlockProperty>}
            {url&&<div style={{...commonSettings, textAlign:align}}><iframe src={url} width={isMobile?'100%':width} height={height} frameBorder="0"></iframe></div>}
        </div>
}

export const toolIframe:ToolDefinition = {
    type: 'iframe',
    name: 'IFrame',
    menu:  {category:'basic',icon: <PagesOutlined /> },
    initData: ()=>{
        return {type:'iframe', data:'',
            settings:{width: 400, height: 500, align:'center'}}
    },
    render: (props:ToolRenderProps)=><BlockIframe {...props} />
}