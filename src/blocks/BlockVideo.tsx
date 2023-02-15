import { VideocamOutlined } from "@mui/icons-material";
import { IconButton,TextField, Button, Dialog, DialogContent, DialogTitle,DialogActions, Input, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { CommonSettings } from "../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyItem } from '../utils';
import { Util } from '../utils/Util';


export const BlockVideo = (props:ToolRenderProps)=>{
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(240);
    const [adding, setAdding] = useState(props.adding?true:false);
    const [videoUrl, setVideoUrl] = useState(props.data.data);
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const handleClickOpen = ()=>{
      setAdding(true);
    }

    const submitVideo = (val:any,type:string)=>{
        setVideoUrl( val );
        setAdding(false);
    }  

    useEffect(()=>{
      props.onChange({...props.data,data: videoUrl, common: commonSettings});
    }, [videoUrl, commonSettings]);

    return <div style={{width: width,height:height, ...commonSettings}}>
            {adding&&<div>
              <Util.renderBroseURL defalutValue={videoUrl} type={'Video'} onConfirm={submitVideo} adding={adding} />
            </div>}
            {props.active&&<BlockProperty  blocktype="video" inBlock={props.inBlock}>
                <div>
                    <label>Width: </label>
                    <input type="text" defaultValue={width} onChange={(e)=>setWidth(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Height: </label>
                    <input type="text" defaultValue={height} onChange={(e)=>setHeight(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Source: </label>
                    <Button onClick={handleClickOpen}>Choose</Button>
                </div>
                {Util.renderCustomProperty(props.data)}
                <div><CommonSettings commonSettings={commonSettings}  settingList={['marginTop']} onChange={(settings)=>setCommonSettings(settings)} /></div>
            </BlockProperty>}
            <video width={'100%'} height={'100%'} controls src={videoUrl} >
              <object data={videoUrl} width={'100%'} height={'100%'}>
                <embed src={videoUrl} width={'100%'} height={'100%'} />
              </object> 
            </video>            
            </div>
}
export const toolVideo:ToolDefinition = {
    type: 'video',
    name:"Video",
    menu:  {category:'basic',icon: <VideocamOutlined /> },
    initData: ()=>{
      return {type:'video', data:'https://www.runoob.com/try/demo_source/movie.ogg', settings:{}}
    },
    view: (props:{data:any})=><BlockVideo data={props.data}  inBlock={false} active={false} onChange={()=>{}} />,
    render: (props:ToolRenderProps)=><BlockVideo {...props} />
}