import React, { ReactElement, useState } from 'react';
import { BlockData, DataFullImage } from '../Main';
import { Input } from '../utils/Input';
import { Ranger } from '../utils/Ranger';


const FullImage = (props:{data:DataFullImage})=>{
   return <div style={{borderColor:'#666666', borderStyle:'solid', ...props.data.style}}><img style={{width: '100%'}} src={props.data.src} /></div>
}

const FullImageSettings = (props:{data:DataFullImage, onSetting:any})=>{

    let style = props.data.style;

    const update = ()=>{
        let content = props.data;
        content.style = {...content.style, ...style};
        props.onSetting(content);
    }

    return <div>
        <label>Table</label>
        <hr />        
        <table style={{width: '100%'}}>
        <tbody>
            <tr><td style={{width: '50px'}}>                
                <label>Padding</label></td><td>
                <Ranger defaultValue={style.padding} min={0} max={20} step={1} onChange={(v:number)=>{style.padding=v;update()}} />
                </td></tr>
            <tr>
                <td><label>Border</label></td><td>
                <Ranger defaultValue={style.borderWidth} min={0} max={5} step={1} onChange={(v:number)=>{style.borderWidth=v;update()}} />
                </td></tr>
            <tr>
                <td><label>Background color</label></td><td>
                <Input onChange={(e:any)=>{style.background=e;update()}} />
                </td>
            </tr>
            <tr>
            <td><label>Caption</label></td><td>
                <Input />
            </td></tr>
        </tbody>
    </table>
    </div>
 }


 export const FullImageHandler = {
    type: 'full_image',
    onDataChange: (ele:HTMLElement):any => {},
    renderMain: (data:BlockData):ReactElement=>{
        return <FullImage data={data as DataFullImage} />
    },
    getDefaultData:():BlockData=>{
       return {
        src:'https://www.iucn.org/sites/dev/files/content/images/2020/shutterstock_1458128810.jpg',
        style: {padding: 2, borderWidth: 0, background:''}
    }
    },
    renderSetting: (data:BlockData, onSetting:any): ReactElement =>{
        return <FullImageSettings data={data as DataFullImage} onSetting={onSetting} />
    }
 }