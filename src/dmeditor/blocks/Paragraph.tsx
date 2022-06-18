import { BoltOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignLeftOutlined, FormatAlignRight, FormatBoldOutlined, FormatItalic, FormatItalicOutlined } from '@mui/icons-material';
import React, { ReactElement, useState } from 'react';
import { BlockData} from '../Main';
import { Ranger } from '../utils/Ranger';


const Paragraph = (props:{data:any})=>{
   return <p>{props.data}</p>
}


const ParagraphSettings = (props:{data:any, onSetting:any})=>{
    return <div><table style={{width: '100%'}}>
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
    
    </div>
 }


 export const ParagraphHandler = {
    type: 'p',
    onDataChange: (ele:HTMLElement):any => {},
    renderMain: (data:BlockData):ReactElement=>{
        return <Paragraph data={data} />
    },
    getDefaultData:():BlockData=>{
        return 'Test';
    },
    renderSetting: (data:BlockData, onSetting:any): ReactElement =>{
        return <ParagraphSettings data={data} onSetting={onSetting} />
    }
 }