import React, { useEffect, useState } from 'react';
import { PickColor, PropertyGroup, PropertyItem,PropertyButton, Ranger } from './utils';
import { Select, MenuItem } from "@mui/material";
import { FormatAlignLeft,FormatAlignCenter,FormatAlignRight, DeleteOutline } from '@mui/icons-material';

export const CommonSettings = (props:{commonSettings:any, settingList?: Array<string>, onDelete?:()=>void, onChange:(data:any)=>void})=>{    
    const [settings, setSettings] = useState(props.commonSettings?props.commonSettings:{});
    const [isChange,setIsChange] = useState(false)
    const [blockOpen, setBlockOpen] = useState(false);
    const [widthType, setWidthType] = useState(()=>{
      if(props.commonSettings){
        if(props.commonSettings?.width){
          if(props.commonSettings.width!=='100%'&&props.commonSettings.width!=='auto'){
            return 'custom'
          }else{
            return props.commonSettings.width
          }
        }else{
          return 'auto'
        }
      }else{
        return 'auto'
      }
    });
    // const [align,setAlign] = useState(props.commonSettings?.align||'left');

    useEffect(()=>{
      if(isChange){
        let s={...settings};
        props.onChange(s);
        setIsChange(false)
      }
    },[isChange]);

    const changeWidth = (v:any)=>{
      setWidthType(v)
      setSettings({...settings, width: v==='custom'?'150px':v})
      setIsChange(true)
    }

    const containSetting = (setting: string) => {
      if( !props.settingList ){
        return true;
      }else{
        return props.settingList.includes(setting);
      }
    }
    const alignList = ['left','center','right'];
    const BlockButton = ({formats}:any) => {
        let ele:any
        if(formats ==='left'){
          ele = <FormatAlignLeft />
        }
        if(formats ==='center'){
          ele = <FormatAlignCenter />
        }
        if(formats ==='right'){
          ele = <FormatAlignRight />
        }
        return ele
      }
    
    const pxToNumber = (v:any)=>{
      let result = 0;
      if(v.endsWith('px')){
        result = parseInt(v)
      }
      return result
    }

    return <div>
        <PropertyGroup header='Block settings' expandable={true} open={blockOpen} onOpenClose={(open)=>setBlockOpen(open)}>
            <PropertyItem label="To top">
                <Ranger min={0} max={100} step={5} defaultValue={settings['margin-top']?pxToNumber(settings['margin-top']):0} onChange={v=>{setSettings({...settings, 'margin-top': v+'px'});setIsChange(true)}} />
            </PropertyItem>
            {containSetting('padding')&&<PropertyItem label="Padding">
                <Ranger min={0} max={30} step={1} defaultValue={settings.padding?pxToNumber(settings.padding):0} onChange={v=>{setSettings({...settings, padding: v+'px'});setIsChange(true)}}/>
        </PropertyItem>}
        {containSetting('align') && <PropertyItem label="Align">
          {alignList.map((format: any, index: any) => {
            return (
              <PropertyButton title={format} key={format} onClick={() => { setSettings({ ...settings, 'text-align': format }); setIsChange(true) }}
                selected={settings['text-align'] == format ? true : false}>
                <BlockButton formats={format} />
              </PropertyButton>
            )
          })}
        </PropertyItem>
        }
            {containSetting('background-color')&&<PropertyItem label="Background color:" autoWidth={true}>
            <PickColor
              color={settings['background-color']||''}
              onChange={v=>{setSettings({...settings, 'background-color': v});setIsChange(true)}}
            ></PickColor>
            </PropertyItem>}
            {containSetting('text-color')&&<PropertyItem label="Text color:" autoWidth={true}>
            <PickColor
              color={settings['text-color']||'#000000'}
              onChange={v=>{setSettings({...settings, 'text-color': v});setIsChange(true)}}
            ></PickColor>
            </PropertyItem>}
            {containSetting('width')&&<PropertyItem label="Width">
              <Select
                value={widthType}
                onChange={(e)=>{changeWidth(e.target.value)}}
                displayEmpty
                size='small'
                inputProps={{'aria-label': 'Without label' }}
              >
                <MenuItem value="auto">
                  <em>auto</em>
                </MenuItem>
                <MenuItem  value="100%">
                  100%
                </MenuItem>
                <MenuItem  value="custom">
                  custom
                </MenuItem>
              </Select>
              {widthType==='custom'&&
                <Ranger min={50} max={800} step={5} defaultValue={settings.width?parseFloat(settings.width):150} onChange={v=>{setSettings({...settings, width: v+'px'});setIsChange(true)}} />
              }
            </PropertyItem>}
        </PropertyGroup>

         {props.onDelete&&
          <div style={{float: 'right'}}>
            <PropertyButton color="warning" title="Delete" onClick={()=>{if(props.onDelete)props.onDelete()}}><DeleteOutline /></PropertyButton>
          </div>
        }
    </div>;
}