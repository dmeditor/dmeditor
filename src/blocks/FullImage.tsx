import React, { ReactElement, useState } from 'react';
import { Button } from '@mui/material';
import { BlockData, BlockLayoutData } from '../types';
import { CommonSetting } from '../Property';
import { Input } from '../utils/Input';
import { Ranger } from '../utils/Ranger';
import { RenderMainProps, RenderSettingProps } from '../blocktype';
import { ImageOutlined } from '@mui/icons-material';


export interface DataFullImage{
    src: string,
    style: {
        padding: number,
        borderWidth: number,
        background: string
    }
}

const FullImage = (props:{data:BlockData, isActive:boolean})=>{    
    let data = props.data.data as DataFullImage;
   return <div style={props.data.layout}>
    <img style={{width: '100%', borderColor:'#333333', borderStyle:'solid', borderWidth: data.style.borderWidth}} 
        src={data.src} />
    </div>
}

const FullImageSettings = (props:RenderSettingProps)=>{
    const [data, setData] = useState(props.data.data as DataFullImage);

    let style = data.style;

    const update = ()=>{
        data.style = {...data.style, ...style};  
        let newData = props.data;
        newData.data = data;      
        props.onSetting(newData);
    }

    const changeCommon = (settings:BlockLayoutData)=>{
        let data = props.data;
        data.layout = settings;
        props.onSetting(data);
    }

    return <div>
        <label>Image</label>
        <table style={{width: '100%'}}>
        <tbody>
             <tr>
                <td><label>Source</label></td><td>
                <Input defaultValue={data.src} onChange={(e:any)=>{data.src=e;update()}} />
                <Button><a href='#'>Browse</a></Button>
                </td>
            </tr>
            <tr>
                <td><label>Border</label></td><td>
                <Ranger defaultValue={style.borderWidth} min={0} max={5} step={1} onChange={(v:number)=>{style.borderWidth=v;update()}} />
                </td></tr>
            <tr>
            <td><label>Caption</label></td><td>
                <Input />
            </td></tr>
        </tbody>
    </table>
    <CommonSetting  settings={props.data.layout}  onChange={changeCommon} />
    </div>
 }


 export const FullImageHandler = {
    type: 'full_image',
    menu:  {text:"Image", category:'basic',icon: <ImageOutlined /> },
    renderMain: (props:RenderMainProps)=><FullImage {...props} />,
    getDefaultData:():BlockData=>{
       return {
        layout:{padding: 0},
        data:{
        src:'https://www.iucn.org/sites/dev/files/content/images/2020/shutterstock_1458128810.jpg',
        style: {padding: 2, borderWidth: 0, background:''}}}
        },
    renderSetting: (props:RenderSettingProps)=><FullImageSettings {...props} />
 }