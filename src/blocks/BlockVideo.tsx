import { VideocamOutlined } from "@mui/icons-material";
import { IconButton,TextField, Button, Dialog, DialogContent, DialogTitle,DialogActions, Input, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { CommonSettings } from "../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { Util } from '../utils/Util';


export const BlockVideo = (props:ToolRenderProps)=>{
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(240);
    const [adding, setAdding] = useState(props.adding?true:false);
    const [videoUrl, setVideoUrl] = useState(props.data.content);
    const [commonSettings, setCommonSettings] = useState(props.data.settings.commonSettings);
    
    const handleClickOpen = ()=>{
      setAdding(true);
      setAdding(false);
      setTimeout(()=>{setAdding(true);},10)
    }

    const submitVideo = (val:any,type:string)=>{
        setVideoUrl( val );
        setAdding(false);
    }
    const handleClose = (event?:any, reason?:any) => {
      if (reason && reason === "backdropClick") 
      return;
      setAdding(false);
    };

    useEffect(()=>{
      props.onChange({type:'video', content: videoUrl, settings:{common: commonSettings}});
    }, [videoUrl, commonSettings]);

    return <div style={{width: width,height:height, ...commonSettings}}>
            {adding&&<div>
              <Util.renderBroseURL type={'Video'} onConfirm={submitVideo} adding={adding} />
            </div>}
            <BlockProperty title={'Video'} active={props.active}>
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
                <div><CommonSettings commonSettings={commonSettings}  settingList={['marginTop']} onChange={(settings)=>setCommonSettings(settings)} /></div>
            </BlockProperty>
            <video width={'100%'} height={'100%'} controls src={videoUrl} >
              <object data={videoUrl} width={'100%'} height={'100%'}>
                <embed src={videoUrl} width={'100%'} height={'100%'} />
              </object> 
            </video>            
            </div>
}
export const toolVideo:ToolDefinition = {
    type: 'video',
    menu:  {text:"Video", category:'basic',icon: <VideocamOutlined /> },
    initData: {type:'video', content:'https://www.runoob.com/try/demo_source/movie.ogg', settings:{}},
    view: (props:{data:any})=><BlockVideo data={props.data} active={false} onChange={()=>{}} />,
    render: (props:ToolRenderProps)=><BlockVideo {...props} />
}