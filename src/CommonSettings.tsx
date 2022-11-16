import React, { useEffect, useState } from 'react';
import { PickColor, PropertyGroup, PropertyItem, Ranger } from './utils';
import { Select,MenuItem} from "@mui/material";

export const CommonSettings = (props:{commonSettings:any, onChange:(data:any)=>void})=>{    
    const [settings, setSettings] = useState(props.commonSettings?props.commonSettings:{});
    const [width, setWidth] = useState(()=>{
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
        let s={...settings};
        props.onChange(s);
    },[settings]);

    const changeWidth = (v:any)=>{
      setWidth(v)
      setSettings({...settings, width: v==='custom'?'150px':v})
    }

    return <div>
        <PropertyGroup header='Common settings' expandable={true} open={false}>
            <PropertyItem label="To top">
                <Ranger min={0} max={100} step={5} defaultValue={settings.marginTop?settings.marginTop:0} onChange={v=>setSettings({...settings, marginTop: v})} />
            </PropertyItem>
            <PropertyItem label="Padding">
                <Ranger min={0} max={30} step={1} defaultValue={settings.padding?settings.padding:0} onChange={v=>setSettings({...settings, padding: v})}/>
            </PropertyItem>
            <PropertyItem label="Background color:" autoWidth={true}>
            <PickColor
              color={settings.backgroundColor?settings.backgroundColor:''}
              onChange={v=>setSettings({...settings, backgroundColor: v})}
            ></PickColor>
            </PropertyItem>
            <PropertyItem label="Text color:" autoWidth={true}>
            <PickColor
              color={settings.color?settings.color:'#000000'}
              onChange={v=>setSettings({...settings, color: v})}
            ></PickColor>
            </PropertyItem>
            <PropertyItem label="Width">
              <Select
                value={width}
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
              {width==='custom'&&
                <Ranger min={50} max={500} step={5} defaultValue={settings.width?parseFloat(settings.width):150} onChange={v=>setSettings({...settings, width: v+'px'})} />
              }
            </PropertyItem>
        </PropertyGroup>
    </div>;
}