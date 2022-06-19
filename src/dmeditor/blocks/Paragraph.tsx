import { BoltOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignLeftOutlined, FormatAlignRight, FormatBoldOutlined, FormatItalic, FormatItalicOutlined } from '@mui/icons-material';
import React, { ReactElement, useState } from 'react';
import { BlockData, BlockLayoutData} from '../Main';
import { CommonSetting } from '../Property';
import { Ranger } from '../utils/Ranger';
import './Paragraph.css';


const Paragraph = (props:{data:BlockData, isActive:boolean, onChange?:(data:any)=>void})=>{
    //todo: filter render allowed tags
    const [data, setData] = useState(props.data.data as string);

    const change = (e:any)=>{
        let text = e.target.innerHTML as string;
        if( props.onChange ){
            let newData = props.data;
            newData.data = text;
            props.onChange(newData);
        }
    }

   if( !data ){
        setData( '<p></p>' );
   }

   return <div style={{...props.data.layout}} contentEditable={props.isActive} onBlur={change} dangerouslySetInnerHTML={{__html:data}}>
   </div>
}


const ParagraphSettings = (props:{data:BlockData, onSetting:any})=>{
    const changeCommon = (settings:BlockLayoutData)=>{
        let data = props.data;
        data.layout = settings;
        props.onSetting(data);
    }

    return <div>
        <label>Paragraph</label>
        <table style={{width: '100%'}}>
        <tbody>
            <tr><td>Format</td><td>
                <a href="#"><FormatBoldOutlined /></a>
                <a href="#"><FormatItalicOutlined /></a>
                </td></tr>
            <tr><td>Align</td><td>
                <a href="#"><FormatAlignLeftOutlined /></a>
                <a href="#"><FormatAlignCenter /></a>
                <a href="#"><FormatAlignRight /></a>
            </td></tr>            
        </tbody>
    </table>
    <table style={{width: '100%'}}>
        <tbody>
            <tr><td width={80}>Columns</td><td>
                <Ranger min={1} defaultValue={1} step={1} max={4} onChange={()=>{}} />
                </td></tr>                     
        </tbody>
    </table>
    <CommonSetting  settings={props.data.layout}  onChange={changeCommon}/>
    </div>
 }


 export const ParagraphHandler = {
    type: 'p',
    onDataChange: (ele:HTMLElement):any => {},
    renderMain: (data:BlockData, isActive:boolean, onChange?:(data:any)=>void):ReactElement=>{
        return <Paragraph data={data} isActive={isActive} onChange={onChange} />
    },
    getDefaultData:():BlockData=>{
        return {
            layout:{padding: 0},
            data:''};
    },
    renderSetting: (data:BlockData, onSetting:any): ReactElement =>{
        return <ParagraphSettings data={data} onSetting={onSetting} />
    }
 }

function useFocus(): [any, any] {
    throw new Error('Function not implemented.');
}
