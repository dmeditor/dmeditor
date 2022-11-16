import { Image, ImageNotSupported, ImageOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Input, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { CommonSettings } from "../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyItem } from "../utils/Property";
import { Util } from '../utils/Util';


export const BlockImage = (props:ToolRenderProps)=>{
    const [fullScreen, setFullScreen] = useState(props.data.settings.fullScreen?true:false);    
    const [adding, setAdding] = useState(props.adding?true:false);
    const [imageUrl, setImageUrl] = useState(props.data.content.url);
    const [text, setText] = useState(props.data.content.text);    
    const [commonSettings, setCommonSettings] = useState(props.data.settings.common);
    
        
    const submitImage = (val:any,type:string)=>{
        let data = props.data;
        if(type === 'input'){
          setImageUrl( val );
          props.onChange({...data,content:{url:val, text:text},source:{sourceType:type},settings:{fullScreen: fullScreen, common: commonSettings} });
        }else{
          let url='{image:'+val.id+'}'
          setImageUrl( url );
          props.onChange({...data,content:{url:url, text:text},source:{sourceType:type,sourceData:val},settings:{fullScreen: fullScreen, common: commonSettings} });
        }
    }
    const handleClickOpen = ()=>{
      setAdding(true);
      setAdding(false);
      setTimeout(()=>{setAdding(true);},10)
    }

    useEffect(()=>{
        props.onChange({...props.data, content:{...props.data.content, text:text}, settings:{...props.data.settings, fullScreen: fullScreen, common: commonSettings} });
    }, [text, fullScreen, commonSettings])

    return <div style={commonSettings}>
            {adding&&<div>
              <Util.renderBroseURL type={'Image'} onConfirm={submitImage} adding={adding} />
            </div>}
            <BlockProperty title={'Image'} active={props.active}>
                <PropertyItem label="Description" autoWidth>
                  <Checkbox checked={text?true:false} onChange={checked=>checked?setText('Description'):setText('')} />
                </PropertyItem>
                <PropertyItem label="Full screen" autoWidth>
                    <Checkbox checked={fullScreen} onChange={(e, checked:boolean)=>setFullScreen(checked)} />
                </PropertyItem>
                <PropertyItem label='Source'>
                  <Button onClick={handleClickOpen}>Choose</Button>
                </PropertyItem>
                <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>setCommonSettings(settings)} /></div>
            </BlockProperty>
                <div style={fullScreen?{marginLeft:'-60px',marginRight:'-60px'}:{}}>
                  <img width='100%' src={imageUrl} />  
                </div>
                {text&&<div contentEditable={true} onBlur={e=>setText(e.target.textContent)}>{text}</div>}
            </div>
}

export const toolImage:ToolDefinition = {
    type: 'image',
    menu:  {text:"Image", category:'basic',icon: <ImageOutlined /> },
    initData: {type:'image', content:{url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png', text:''},
                settings:{},source:{sourceType:'input'}},
    view: (props:{data:any})=><BlockImage data={props.data} active={false} onChange={()=>{}} />,
    render: (props:ToolRenderProps)=><BlockImage {...props} />
}