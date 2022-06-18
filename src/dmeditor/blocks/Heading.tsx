import React, { ReactElement, useState } from 'react';
import { BlockData, DataFullImage, DataHeading } from '../Main';
import { Input } from '../utils/Input';
import { Ranger } from '../utils/Ranger';


const Heading = (props:{data:DataHeading})=>{
    const content = props.data;
    switch(content.style.level){
        case 1:
            return <h1>{content.text}</h1>
            break;
        case 2:
            return <h2>{content.text}</h2>
            break;
        case 3:
            return <h3>{content.text}</h3>
            break;
        case 4:
            return <h4>{content.text}</h4>
            break;
        case 5:
            return <h5>{content.text}</h5>
            break;
        default:
            return <h2>{content.text}</h2>
    }
}


const HeadingSettings = (props:{data:DataHeading, onSetting:any})=>{

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
                <label>Level</label></td><td>
                <Ranger defaultValue={style.level} min={1} max={5} step={1} onChange={(v:number)=>{style.level=v;update()}} />
                </td></tr>                       
        </tbody>
    </table>
    </div>
 }


 export const HeadingHandler = {
    type: 'heading',
    onDataChange: (ele:HTMLElement):any => {},
    renderMain: (data:BlockData):ReactElement=>{
        return <Heading data={data as DataHeading} />
    },
    renderSetting: (data:BlockData, onSetting:any): ReactElement =>{
        return <HeadingSettings data={data as DataHeading} onSetting={onSetting} />
    }
 }