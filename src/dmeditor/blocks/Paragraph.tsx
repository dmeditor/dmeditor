import { AudioFileOutlined, BoltOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignLeftOutlined, FormatAlignRight, FormatBoldOutlined, FormatItalic, FormatItalicOutlined, FormatListBulletedOutlined, ImageOutlined, InsertChartOutlined, LinkOutlined, RectangleOutlined, SmartButtonOutlined, VideoFileOutlined } from '@mui/icons-material';
import React, { ReactElement, useState } from 'react';
import { BlockData, BlockLayoutData} from '../Main';
import { CommonSetting } from '../Property';
import { Ranger } from '../utils/Ranger';
import parse, { domToReact } from 'html-react-parser';
import { Element } from 'domhandler/lib/node';
import './Paragraph.css';
import { BlockHandler } from '../BlockManager';
import { Input } from '../utils/Input';
import { DMTab } from '../Tab';
import { ListItemIcon, MenuItem, Select } from '@mui/material';


interface ParamsLink {
    type: string,
    href: string,
    element: HTMLElement
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
            props.onSubSelect({type:'a', href:href, element: e.target});
        }
        e.target.setAttribute('id', 'dmeditor-active-element');
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

    const change = (v:string)=>{
        document.getElementById('dmeditor-active-element')?.setAttribute('href', v);
    }

    return <div><DMTab
    tabs={[ ...(props.params?[{
        text: 'Element', 
        content:
        <div>{props.params&&props.params.type=='a'&&<div> 
            <div>
                <label>Link setings</label><br /><br /></div>
            <div>
            <div>
              Link: <Input onChange={change} defaultValue={props.params.href} />
            </div>
            </div>
            </div>}       
    </div>    
    }]:[]),
    {
        text: 'Block', 
        content: <div>
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
            <CommonSetting  settings={props.data.layout}  onChange={changeCommon}/>
        </div>
    },

]} />
{(!props.params)&&<div style={{padding: 10}}><Select size='small' fullWidth defaultValue="0" style={{border:'none'}} >
    <MenuItem value="0">Add element</MenuItem>
    <MenuItem value="link"><LinkOutlined style={{verticalAlign: 'middle'}} /> &nbsp;Link</MenuItem>
    <MenuItem value="image"><ImageOutlined style={{verticalAlign: 'middle'}} /> &nbsp;Image</MenuItem>
    <MenuItem value="video"><VideoFileOutlined />&nbsp;Video</MenuItem>
    <MenuItem value="audio"><AudioFileOutlined />&nbsp;Audio</MenuItem>
    <MenuItem value="button"><RectangleOutlined />&nbsp;Button</MenuItem>        
    <MenuItem value="list"><FormatListBulletedOutlined />&nbsp;List</MenuItem>    
    </Select></div>}
</div>
        
 }


 export const ParagraphHandler:BlockHandler = {
    type: 'p',
    canSelectElement: true,
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
