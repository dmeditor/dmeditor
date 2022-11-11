import { Image, ImageNotSupported, ImageOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Input, Modal } from "@mui/material";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyItem } from "../utils/Property";
import { Util } from '../utils/Util';


export const BlockImage = (props:ToolRenderProps)=>{
    const [width, setWidth] = useState(300);
    const [fullScreen, setFullScreen] = useState(props.data.settings.fullScreen?true:false);    
    const [adding, setAdding] = useState(props.adding?true:false);
    const [imageUrl, setImageUrl] = useState(props.data.content);
        
    const submitImage = (val:any,type:string)=>{
        let data = props.data;
        if(type === 'input'){
          setImageUrl( val );
          props.onChange({...data,content:val,source:{sourceType:type},settings:{fullScreen: fullScreen} });
          console.log({...data,content:val,source:{sourceType:type},settings:{fullScreen: fullScreen} })
        }else{
          let url='{image:'+val.id+'}'
          setImageUrl( url );
          props.onChange({...data,content:url,source:{sourceType:type,sourceData:val},settings:{fullScreen: fullScreen} });
          console.log({...data,content:url,source:{sourceType:type,sourceData:val},settings:{fullScreen: fullScreen} })
        }
    }
    const handleClickOpen = ()=>{
      setAdding(true);
      setAdding(false);
      setTimeout(()=>{setAdding(true);},10)
    }

    return <div style={fullScreen?{marginLeft:'-60px',marginRight:'-60px'}:{}}>
            {adding&&<div>
              {Util.renderBrowseImage({onConfirm:submitImage,adding:adding})}
            </div>}
            <BlockProperty title={'Image'} active={props.active}>
                <PropertyItem label="Width">
                    <input type="text" defaultValue={width} onChange={(e)=>setWidth(parseInt(e.target.value))} />
                </PropertyItem>
                <PropertyItem label="Full screen" autoWidth>
                    <Checkbox checked={fullScreen} onChange={(e, checked:boolean)=>setFullScreen(checked)} />
                </PropertyItem>
                <PropertyItem label='Source'>
                  <Button onClick={handleClickOpen}>Choose</Button>
                </PropertyItem>
            </BlockProperty>

                <img width={'100%'} src={imageUrl} />        
            </div>
}

export const toolImage:ToolDefinition = {
    type: 'image',
    menu:  {text:"Image", category:'basic',icon: <ImageOutlined /> },
    initData: {type:'image', content:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png',
                settings:{},source:{sourceType:'input'}},
    render: (props:ToolRenderProps)=><BlockImage {...props} />
}