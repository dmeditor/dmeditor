import React, { useEffect, useState } from 'react';
import { PickColor, PropertyGroup, PropertyItem, Ranger } from './utils';
import { Select,MenuItem} from "@mui/material";

export const CommonSettings = (props:{commonSettings:any, settingList?: Array<string>, onChange:(data:any)=>void})=>{    
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

    return <div>
        <PropertyGroup header='Block settings' expandable={true} open={blockOpen} onOpenClose={(open)=>setBlockOpen(open)}>
            <PropertyItem label="To top">
                <Ranger min={0} max={100} step={5} defaultValue={settings.marginTop?settings.marginTop:0} onChange={v=>{setSettings({...settings, marginTop: v});setIsChange(true)}} />
            </PropertyItem>
            {containSetting('padding')&&<PropertyItem label="Padding">
                <Ranger min={0} max={30} step={1} defaultValue={settings.padding?settings.padding:0} onChange={v=>{setSettings({...settings, padding: v});setIsChange(true)}}/>
            </PropertyItem>}
            {containSetting('backgroundColor')&&<PropertyItem label="Background color:" autoWidth={true}>
            <PickColor
              color={settings.backgroundColor?settings.backgroundColor:''}
              onChange={v=>{setSettings({...settings, backgroundColor: v});setIsChange(true)}}
            ></PickColor>
            </PropertyItem>}
            {containSetting('color')&&<PropertyItem label="Text color:" autoWidth={true}>
            <PickColor
              color={settings.color?settings.color:'#000000'}
              onChange={v=>{setSettings({...settings, color: v});setIsChange(true)}}
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
    </div>;
}