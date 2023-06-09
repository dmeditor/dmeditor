import { VideocamOutlined } from "@mui/icons-material";
import { Button} from "@mui/material";
import { useEffect, useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { CommonSettings } from "../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyItem,Ranger,Util } from '../utils';
import { getCommonBlockCss } from "../Block";


export const BlockVideo = (props:ToolRenderProps)=>{
    const [width, setWidth] = useState(props.data.settings.width||300);
    const [height, setHeight] = useState(props.data.settings.height||240);
    const [adding, setAdding] = useState(props.adding?true:false);
    const [videoUrl, setVideoUrl] = useState(props.data.data);
    const [commonSettings, setCommonSettings] = useState(props.data.settings?.style||{});
    const handleClickOpen = ()=>{
      setAdding(false);
      setTimeout(()=>{setAdding(true);},10)
    }

    const submitVideo = (val:any,type:string)=>{
        setVideoUrl( val );
        setAdding(false);
    }  

    useEffect(()=>{
      props.onChange({...props.data,data: videoUrl,settings:{width:width,height:height,style: commonSettings}});
    }, [videoUrl,width,height,commonSettings]);

    return <div style={{width: width,height:height, ...commonSettings}} className={getCommonBlockCss('video')}>
            {adding&&<div>
              <Util.renderBroseURL defalutValue={videoUrl} type={'Video'} onConfirm={submitVideo} adding={adding} />
            </div>}
            {props.active&&<BlockProperty  blocktype="video" inBlock={props.inBlock}>
                <PropertyItem label='Width'>
                   <Ranger min={50} max={800} step={1} defaultValue={width} onChange={v=>{setWidth(v)}}/>
                </PropertyItem>
                <PropertyItem label='Height'>
                  <Ranger min={50} max={800} step={1}  defaultValue={height} onChange={v=>{setHeight(v)}}/>
                </PropertyItem>
                <PropertyItem label='Source'>
                  <Button onClick={handleClickOpen}>Choose</Button>
                </PropertyItem>
                
                {Util.renderCustomProperty(props.data)}
                <div><CommonSettings commonSettings={commonSettings}  settingList={['marginTop']} onChange={(settings)=>{setCommonSettings(settings)}} onDelete={props.onDelete}/></div>
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
    render: (props:ToolRenderProps)=><BlockVideo {...props} />
}