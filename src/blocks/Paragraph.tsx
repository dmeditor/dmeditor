import { AudioFileOutlined, FormatAlignCenter, FormatAlignLeftOutlined, FormatAlignRight, FormatBoldOutlined, FormatItalicOutlined, FormatListBulletedOutlined, ImageOutlined, LinkOutlined, RectangleOutlined, TextSnippetOutlined, VideoFileOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { BlockData, BlockLayoutData} from '../types';
import { CommonSetting } from '../Property';
import parse, { domToReact } from 'html-react-parser';
import { Element } from 'domhandler/lib/node';
import './Paragraph.css';
import { BlockHandler, RenderMainProps, RenderSettingProps } from '../blocktype';
import { Input } from '../utils/Input';
import { DMTab } from '../Tab';

interface BlockDataParagraph extends BlockData{
    data: string
}

interface ParamsLink {
    mode: 'select'|'insert',
    type: string, //tagName: a, text.
    element?: HTMLElement|Range
}

const Paragraph = (props:{data:BlockDataParagraph, isActive:boolean, onChange?:(data:any)=>void, onUpdateProperty?:(params?:ParamsLink)=>void})=>{
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
        if( props.isActive ){
            e.stopPropagation();
            if( props.onUpdateProperty ){
                props.onUpdateProperty({type:'a', mode:'select', element: e.target});
            }
            e.target.setAttribute('id', 'dmeditor-active-element');
        }
   }

   const selectNone = ()=>{
    // if( props.isActive && props.onUpdateProperty ){
    //     props.onUpdateProperty(undefined);
    //     document.getElementById('dmeditor-active-element')?.removeAttribute('id');
    // }
   }

   const selectText = (el:any)=>{
        const ele = window.getSelection();
        if( props.onUpdateProperty ){
            let range = ele?.getRangeAt(0);
            let isInsert = range?.toString() === '';

            props.onUpdateProperty({mode:(isInsert?'insert':'select'),type:'text', element: range});
        }
   }

   let elements = parse(data, {replace:(domNode:any)=>{
        if( domNode instanceof Element && domNode.tagName === 'a' ){
            return <a onClick={(e)=>selectTag(e, domNode.attribs['href'])} {...domNode.attribs}>{domToReact(domNode.children)}</a>
        }
   }});
   

   return <div onClick={selectNone} onMouseUp={selectText} style={{...props.data.layout}} contentEditable={props.isActive} onBlur={change}>
    {elements}
   </div>
}


const ParagraphSettings = (props:RenderSettingProps)=>{
    const changeCommon = (settings:BlockLayoutData)=>{
        let data = props.data;
        data.layout = settings;
        props.onSetting(data);
    }

    const changeHref = (v:string)=>{
        document.getElementById('dmeditor-active-element')?.setAttribute('href', v);
    }

    const changeText = (v:string)=>{
        const ele = document.getElementById('dmeditor-active-element');
        if( ele ){
            ele.textContent = v;
        }
    }

    const insert = (type:string)=>{
        switch( type ){
            case 'link':
            let range = props.params?.element as Range;
            let newNode = document.createElement("a");
            newNode.appendChild(document.createTextNode("Good"));
            range?.insertNode(newNode);
            break;
        }
    }

    const insertTools = [ {type:'link', text:'Link', icon:<LinkOutlined style={{fontSize: 30}} /> },
    {type:'image', text:'Image', icon:<ImageOutlined style={{fontSize: 30}} /> },
    {type:'video', text:'Video', icon:<VideoFileOutlined style={{fontSize: 30}} /> },
    {type:'audio', text:'audio', icon:<AudioFileOutlined style={{fontSize: 30}} /> },
    {type:'button', text:'Button', icon:<RectangleOutlined style={{fontSize: 30}} /> },
    {type:'list', text:'List', icon:<FormatListBulletedOutlined style={{fontSize: 30}} /> },

];

    return <div><DMTab
         tabs={[{
        text: 'Element', 
        content:
        <div>{props.params&&<>
            {(props.params.mode==='select')&&<div>
                <label>Select</label> <br /><br />
                {props.params.type=='a'&&<div> 
                <div>
                    <label>Link setings</label><br /><br /></div>
                <div>
                <div>
                Link: <Input onChange={changeHref} defaultValue={props.params.element.getAttribute('href')} />              
                </div>
                <div>
                Text: <Input onChange={changeText} defaultValue={(props.params.element as HTMLElement).textContent} />              
                </div>
                </div>
                </div>}   

                {props.params.type=='text'&&<div>
                    <FormatBoldOutlined />   
                    <FormatItalicOutlined /> 
                    Color
                </div>}  
            </div>}                     

            {(props.params.mode==='insert')&&<div>               
                <div style={{fontSize: 16}}><label>Insert</label></div>
                <table>
                    <tbody>
                        {insertTools.map((item)=><tr style={{cursor: 'pointer'}} onClick={()=>insert(item.type)}><td>{item.icon}</td><td>{item.text}</td></tr>)}
                    </tbody>
                </table>
                </div>}
    </>}</div>    
    },
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
</div>
        
 }


 export const ParagraphHandler:BlockHandler = {
    type: 'p',
    menu: {text:"Paragraph", category:'basic', icon: <TextSnippetOutlined /> },
    canSelectElement: true,
    renderMain: (props:RenderMainProps)=><Paragraph {...props} />,
    getDefaultData:():BlockDataParagraph=>{
        return {
            layout:{padding: 0},
            data:''};
    },
    renderSetting: (props:RenderSettingProps) =><ParagraphSettings {...props} />
 }

function useFocus(): [any, any] {
    throw new Error('Function not implemented.');
}
