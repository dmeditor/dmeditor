import React, { ReactElement, useState } from 'react';
import { RenderMainProps, RenderSettingProps } from '../BlockManager';
import { BlockData, BlockLayoutData, DataFullImage, DataHeading } from '../Main';
import { CommonSetting } from '../Property';
import { Input } from '../utils/Input';
import { Ranger } from '../utils/Ranger';


const Heading = (props:{data:BlockData, isActive:boolean, onChange?:any})=>{
    const content = props.data.data as DataHeading;

    const change = (e:any)=>{
        const text = e.target.innerText;
        if(props.onChange){
            content.text = text;
            let newData = props.data;
            newData.data = content;
            props.onChange(newData);
        }
    }

    const common = {onBlur:change, contentEditable: props.isActive, style:{...props.data.layout}}

    switch(content.style.level){
        case 1:
            return <h1 {...common}>{content.text}</h1>
            break;
        case 2:
            return <h2 {...common}>{content.text}</h2>
            break;
        case 3:
            return <h3 {...common}>{content.text}</h3>
            break;
        case 4:
            return <h4 {...common}>{content.text}</h4>
            break;
        case 5:
            return <h5 {...common}>{content.text}</h5>
            break;
        default:
            return <h2 {...common}>{content.text}</h2>
    }
}


const HeadingSettings = (props:RenderSettingProps)=>{

    let style = (props.data.data as DataHeading).style;

    const update = ()=>{
        let content = props.data.data as DataHeading;
        content.style = {...content.style, ...style};
        let newData = props.data;
        newData.data = content;
        props.onSetting(newData);
    }

    const changeCommon = (settings:BlockLayoutData)=>{
        let data = props.data;
        data.layout = settings;
        props.onSetting(data);
    }

    return <div>
        <label>Heading</label>
        <table style={{width: '100%'}}>
        <tbody>
            <tr><td style={{width: '50px'}}>                
                <label>Level</label></td><td>
                <Ranger defaultValue={style.level} min={1} max={5} step={1} onChange={(v:number)=>{style.level=v;update()}} />
                </td></tr>                       
        </tbody>
    </table>
    <CommonSetting  settings={props.data.layout}  onChange={changeCommon}/>
    </div>
 }


 export const HeadingHandler = {
    type: 'heading',
    renderMain: (props:RenderMainProps)=><Heading {...props} />,
    getDefaultData:():BlockData=>{
        return {
            layout:{padding: 0},
            data: {text:'Test', style:{level: 2}}
        };
    },    
    renderSetting:  (props:RenderSettingProps)=><HeadingSettings {...props} />    
 }