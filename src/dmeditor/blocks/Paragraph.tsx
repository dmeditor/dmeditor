import { BoltOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignLeftOutlined, FormatAlignRight, FormatBoldOutlined, FormatItalic, FormatItalicOutlined } from '@mui/icons-material';
import React, { ReactElement, useState } from 'react';
import { BlockData, BlockLayoutData} from '../Main';
import { CommonSetting } from '../Property';
import { Ranger } from '../utils/Ranger';
import parse, { domToReact } from 'html-react-parser';
import { Element } from 'domhandler/lib/node';
import './Paragraph.css';
import { BlockHandler } from '../BlockManager';
import { Input } from '../utils/Input';


interface ParamsLink {
    type: string,
    href: string
}

const Paragraph = (props:{data:BlockData, isActive:boolean, onChange?:(data:any)=>void, onSubSelect?:(params?:ParamsLink)=>void})=>{
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

   const selectTag = (e:any, href:string)=>{
        e.preventDefault();
        // e.stopproPagation();
        if( props.onSubSelect ){
            props.onSubSelect({type:'a', href:href});
        }
   }

   const selectNone = ()=>{
    if( props.onSubSelect ){
        props.onSubSelect(undefined);
    }
   }

   let elements = parse(data, {replace:(domNode:any)=>{
        if( domNode instanceof Element && domNode.tagName === 'a' ){
            return <a onClick={(e)=>selectTag(e, domNode.attribs['href'])} {...domNode.attribs}>{domToReact(domNode.children)}</a>
        }
   }});

   return <div style={{...props.data.layout}} contentEditable={props.isActive} onBlur={change}>
    {elements}
   </div>
}


const ParagraphSettings = (props:{data:BlockData, onSetting:any, params?:ParamsLink})=>{
    const changeCommon = (settings:BlockLayoutData)=>{
        let data = props.data;
        data.layout = settings;
        props.onSetting(data);
    }

    return <div>

        {props.params&&props.params.type=='a'&&<div> 
            <div>Link setings:</div>
            <div style={{background: '#eeeeee', padding: 10}}>
            <div>
                    Link: <Input onChange={()=>{}} defaultValue={props.params.href} />
            </div>
            </div>
            </div>}
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


 export const ParagraphHandler:BlockHandler = {
    type: 'p',
    onDataChange: (ele:HTMLElement):any => {},
    renderMain: (data:BlockData, isActive:boolean, onChange?:(data:any)=>void, onSubSelect?:any):ReactElement=>{
        return <Paragraph data={data} isActive={isActive} onChange={onChange} onSubSelect={onSubSelect} />
    },
    getDefaultData:():BlockData=>{
        return {
            layout:{padding: 0},
            data:''};
    },
    renderSetting: (data:BlockData, onSetting:any, params?:any): ReactElement =>{
        return <ParagraphSettings data={data} onSetting={onSetting} params={params} />
    }
 }

function useFocus(): [any, any] {
    throw new Error('Function not implemented.');
}
