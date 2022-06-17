import React, { useState } from 'react';
import { DataFullImage } from '../Main';
import { Input } from '../utils/Input';
import { Ranger } from '../utils/Ranger';


export const FullImage = (props:{content:DataFullImage})=>{
   return <div style={{borderColor:'#666666', borderStyle:'solid', ...props.content.style}}><img style={{width: '100%'}} src={props.content.src} /></div>
}


export const FullImageSettings = (props:{content:DataFullImage, onSetting:any})=>{

    let style = props.content.style;

    const update = ()=>{
        let content = props.content;
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