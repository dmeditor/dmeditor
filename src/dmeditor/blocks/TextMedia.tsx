import { BoltOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignLeftOutlined, FormatAlignRight, FormatAlignRightOutlined, FormatBoldOutlined, FormatItalic, FormatItalicOutlined } from '@mui/icons-material';
import React, { ReactElement, useState } from 'react';
import { BlockData, BlockLayoutData, DataTextMedia} from '../Main';
import { CommonSetting } from '../Property';
import { Ranger } from '../utils/Ranger';
import './Paragraph.css';


const TextMedia = (props:{data:BlockData, isActive:boolean, onChange?:(data:any)=>void, onUpdateProperty?:any})=>{
    //todo: filter render allowed tags
    const [data, setData] = useState(props.data.data as DataTextMedia);
    const [selectedEle, setSelectedEle] = useState('');
    
    const change = (e:any)=>{
        let text = e.target.innerHTML as string;
        if( props.onChange ){
            let newData = props.data;
            (newData.data as DataTextMedia).text = text;
            props.onChange(newData);
        }
    }

   const selectImage = (e:any)=>{
    e.stopPropagation();
    setSelectedEle('image');
    if( props.onUpdateProperty ){
        props.onUpdateProperty('image');
    }
   }

   const selectNone = ()=>{
    setSelectedEle('');
    if( props.onUpdateProperty ){
        props.onUpdateProperty('');
    }
   }

   return <div onClick={selectNone}>
   <img onClick={selectImage} style={{width: '400px', float:(data.media.align?data.media.align:'right'), margin:5, outline:(selectedEle?'1px solid green':''), borderColor:'#999999', borderStyle:'solid', borderWidth:data.media.border }} src={data.media.src} />
   <div style={{...props.data.layout}} contentEditable={props.isActive} onBlur={change} dangerouslySetInnerHTML={{__html:data.text}}>
   </div></div>
}


const TextMediaSettings = (props:{data:BlockData, onSetting:any, params?:any})=>{
    const changeCommon = (settings:BlockLayoutData)=>{
        let data = props.data;
        data.layout = settings;
        props.onSetting(data);
    }

    const updateImage = (value:any)=>{
        let newData = props.data;
        let content = newData.data as DataTextMedia;
        content.media = {...content.media, ...value}
        newData.data = content;
        
        props.onSetting(newData);
    }

    const mediaSetting = (props.data.data as DataTextMedia).media;

    return <div> {props.params=='image'&&<div>
        <label>Image</label>
            <table style={{width: '100%', margin:'5px 0px', background:'#f0f0f0', border: '1px solid #eeeeee'}}>
            <tbody>
                <tr><td>Border</td><td>
                    <Ranger min={0} max={30} step={1} defaultValue={mediaSetting.border} onChange={(v:number)=>{updateImage({border: v})}} />
                    </td></tr>
                <tr><td>Align</td><td>
                    <FormatAlignLeftOutlined onClick={()=>updateImage({align:'left'})} style={mediaSetting.align==='left'?{color:'green'}:{}}/>
                    <FormatAlignRightOutlined onClick={()=>updateImage({align:'right'})} style={(mediaSetting.align==='right'||!mediaSetting.align)?{color:'green'}:{}} />
                </td></tr>            
            </tbody>
        </table>
        </div>}       
    <table style={{width: '100%'}}>
        <tbody>
            <tr><td width={80}>Line height</td><td>

                </td></tr>                     
        </tbody>
    </table>
    <CommonSetting  settings={props.data.layout}  onChange={changeCommon}/>
    </div>
 }


 export const TextMediaHandler = {
    type: 'text_media',
    selectSub: true,
    onDataChange: (ele:HTMLElement):any => {},
    renderMain: (data:BlockData, isActive:boolean, onChange?:(data:any)=>void, onUpdateProperty?:any):ReactElement=>{
        return <TextMedia data={data} isActive={isActive} onChange={onChange} onUpdateProperty={onUpdateProperty} />
    },
    getDefaultData:():BlockData=>{
        return {
            layout:{padding: 0},
            data:{
                text: '<p></p>',
                media: {
                    type: 'image',                    
                    src: 'https://www.iucn.org/sites/dev/files/content/images/2020/shutterstock_1458128810.jpg'
                }
            }};
    },
    renderSetting: (data:BlockData, onSetting:any, params?:any): ReactElement =>{
        return <TextMediaSettings data={data} onSetting={onSetting} params={params} />
    }
 }
