import { ImageOutlined } from "@mui/icons-material";
import { Button, Checkbox} from "@mui/material";
import { useEffect, useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { CommonSettings } from "../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyItem,Util,PropertyGroup,Ranger,PickColor } from "../utils";
import { TemplateSettings } from "../templates/TemplateSettings";
import { getTemplateCss } from "../Block";


export const BlockImage = (props:ToolRenderProps)=>{
    const [fullScreen, setFullScreen] = useState(props.data.settings.fullScreen?true:false);    
    const [adding, setAdding] = useState(props.adding?true:false);
    const [imageUrl, setImageUrl] = useState(props.data.source&&props.data.source.sourceType==='select'?Util.getImageUrl(props.data.source.sourceData.image):props.data.data.url);
    const [text, setText] = useState(props.data.data.text);    
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const [borderWidth, setBorderWidth] = useState(props.data?.settings?.borderWidth||0);
    const [borderColor, setBorderColor] = useState(props.data?.settings?.borderColor||'transparent');
    const [template, setTemplate] = useState(props.data.template);
    const submitImage = (val:any,type:string)=>{
        let data = props.data;
        if(type === 'input'){
          setImageUrl( val );
          props.onChange({...data,data:{url:val, text:text},source:{sourceType:type},settings:{fullScreen: fullScreen}, common: commonSettings});
        }else{
          // let url='{image:'+val.id+'}'
          let url=Util.getImageUrl(val.image)
          setImageUrl( url );
          props.onChange({...data,data:{url:val.id, text:text},source:{sourceType:type,sourceData:val},settings:{fullScreen: fullScreen}, common: commonSettings });
        }
    }
    const handleClickOpen = ()=>{
      setAdding(true);
      setAdding(false);
      setTimeout(()=>{setAdding(true);},10)
    }
    // useEffect(()=>{
    //   if( ids.length > 0){
    //     FetchWithAuth(process.env.REACT_APP_REMOTE_URL+'/content/list/image?cid='+ids.join(',')).then((data:any)=>{
    //       setSelectsource(data.data.list);
    //     });
    // }
    // },[])
    useEffect(()=>{
        props.onChange({...props.data, template:template, data:{...props.data.data, text:text}, settings:{...props.data.settings, fullScreen: fullScreen,borderWidth:borderWidth,borderColor:borderColor}, common: commonSettings });
    }, [text, fullScreen,borderWidth,borderColor, commonSettings, template])
  

  return <div className={(fullScreen ? 'fullscreen' : '')+' '+ getTemplateCss('image', template)} style={{...commonSettings,border:`${borderWidth}px solid ${borderColor}`}}>
    {adding&&<div>
      <Util.renderBroseURL type={'Image'} onConfirm={submitImage} adding={adding} />
    </div>}
    {props.active&&<BlockProperty  blocktype="image" inBlock={props.inBlock}>
        {!text&&<PropertyItem label="Description" autoWidth>
          <Button onClick={()=>setText('Description')}>Add description</Button>
        </PropertyItem>}
        {(!props.inBlock)&&<PropertyItem label="Full screen" autoWidth>
            <Checkbox checked={fullScreen} onChange={(e, checked:boolean)=>{setFullScreen(checked);}} />
        </PropertyItem>}
        <PropertyItem label='Source'>
          <Button onClick={handleClickOpen}>Choose</Button>
      </PropertyItem>
        <PropertyGroup header="Border">
          <PropertyItem label='Width'>
          <Ranger min={0} max={10} step={1} onChange={(v: number) => setBorderWidth(v)} defaultValue={borderWidth?borderWidth:'0'} />
          </PropertyItem> 
          <PropertyItem label='Color'>
            <PickColor color={borderColor?borderColor:'transparent'} onChange={(v:any)=>setBorderColor(v)} />
          </PropertyItem> 
        </PropertyGroup>
        {Util.renderCustomProperty(props.data)}
        <TemplateSettings template={props.data.template||''} blocktype='image'  onChange={(identifier:string)=>setTemplate( identifier)} />
        <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>setCommonSettings(settings)} onDelete={props.onDelete}/></div>
    </BlockProperty>}
        <div >
          <img width='100%' src={imageUrl} />  
        </div>
        {text&&<div className="image-caption" contentEditable={props.active} onBlur={e=>setText(e.target.textContent)}>{text}</div>}
    </div>
}

export const toolImage:ToolDefinition = {
    type: 'image',
    name:"Image",
    menu:  { category:'basic',icon: <ImageOutlined /> },
    initData: ()=>{ 
      return {type:'image', data:{url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png', text:''},
                settings:{},source:{sourceType:'input'}}},
    view: (props:{data:any})=><BlockImage view={true} data={props.data} inBlock={false} active={false} onChange={()=>{}} />,
    render: (props:ToolRenderProps)=><BlockImage {...props} />
}