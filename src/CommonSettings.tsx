import React, { useEffect, useState } from 'react';
import { PickColor, PropertyGroup, PropertyItem, Ranger } from './utils';

export const CommonSettings = (props:{commonSettings:any, onChange:(data:any)=>void})=>{    
    const [settings, setSettings] = useState(props.commonSettings?props.commonSettings:{});

    useEffect(()=>{
        props.onChange(settings);
    },[settings]);

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
              color={settings.backGroundColor?settings.backGroundColor:''}
              onChange={v=>setSettings({...settings, backgroundColor: v})}
            ></PickColor>
            </PropertyItem>
            <PropertyItem label="Text color:" autoWidth={true}>
            <PickColor
              color={settings.color?settings.color:'#000000'}
              onChange={v=>setSettings({...settings, color: v})}
            ></PickColor>
            </PropertyItem>
        </PropertyGroup>
    </div>;
}