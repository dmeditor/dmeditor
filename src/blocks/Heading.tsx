import { TitleOutlined,FormatAlignLeft,FormatAlignCenter,FormatAlignRight,LoopOutlined } from '@mui/icons-material';
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import React, {useEffect ,useState,useRef} from 'react';
import { CommonSettings } from '../CommonSettings';
import { PropertyItem,PropertyButton,Util,Ranger} from '../utils';
import TextField from '@mui/material/TextField';

const Heading = (props:ToolRenderProps)=>{
    const [text,setText] = useState(props.data.data);
    const [level,setLevel] = useState(props.data.settings.level);
    const [align,setAlign] = useState(props.data.settings?.align||'left');
    const [id,setId] = useState(props.data.settings?.id||'');
    const [commonSettings,setCommonSettings] = useState(props.data.common?props.data.common:{});
    const headRef:any=useRef(null);
    const [isChange,setIsChange] = useState(false);
    const alignList = ['left','center','right'];
    const BlockButton = ({formats}:any) => {
      let ele:any
      if(formats ==='left'){
        ele = <FormatAlignLeft />
      }
      if(formats ==='center'){
        ele = <FormatAlignCenter />
      }
       if(formats ==='right'){
        ele = <FormatAlignRight />
      }
      return ele
    }
    const changeText = (e?:any)=>{
      const texts=headRef.current.innerText
      setText(texts);
      setIsChange(true);
    }

    const common = { onBlur:changeText,ref:headRef, contentEditable: props.active, style:{...commonSettings,textAlign:align},}
    const render = ()=>{
      switch(level){
        case 1:
            return <h1 suppressContentEditableWarning {...common} id={id}>{text}</h1>
            break;
        case 2:
            return <h2  suppressContentEditableWarning {...common} id={id}>{text}</h2>
            break;
        case 3:
            return <h3 suppressContentEditableWarning {...common} id={id}>{text}</h3>
            break;
        case 4:
            return <h4 suppressContentEditableWarning {...common} id={id}>{text}</h4>
            break;
        case 5:
            return <h5 suppressContentEditableWarning {...common} id={id}>{text}</h5>
            break;
        default:
            return <h2 suppressContentEditableWarning {...common} id={id}>{text}</h2>
      }
    }

    const autoCreateId = ()=>{
      const texts=headRef.current.innerText
      let newId = texts.trim().replace(/\s/g,'-').replace(/[^\w\-]/g,'').toLowerCase()
      console.log(newId);
      setId(newId)
    }

    useEffect(()=>{
     if(isChange){
      let newData = {...props.data,data:text,settings:{level:level,align:align,id:id}, common: {...commonSettings}}
      props.onChange(newData);
      setIsChange(false);
     }
    },[isChange])

    return (
      <>
        {props.active&&<BlockProperty  blocktype="heading" inBlock={props.inBlock}>
          <PropertyItem label="ID">
            <TextField sx={{width:'calc(100% - 37px)'}}  placeholder='Please enter ID'  value={id} size="small" hiddenLabel variant="outlined" onChange={(e)=>{setId(e.target.value);setIsChange(true);}} />
            <PropertyButton title="Auto generate Id" onClick={()=>{autoCreateId()}}>
              <LoopOutlined/>
            </PropertyButton> 
          </PropertyItem>  
          <PropertyItem label="Level">
                <Ranger defaultValue={level} min={1} max={5} step={1} onChange={(v:any)=>{setLevel(v);setIsChange(true);}} />
          </PropertyItem>   
          <PropertyItem label="Align">
            {alignList.map((format:any,index:any)=>{           
              return (
                <PropertyButton title={format} key={format} onClick={()=>{setAlign(format);setIsChange(true);}}
                  selected={align==format ? true : false}>
                  <BlockButton formats={format} />
                </PropertyButton>    
                )             
            })}
          </PropertyItem>
          {Util.renderCustomProperty(props.data)}
        <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true);}} /></div>
        </BlockProperty>}
        {render()}  
    </> 
    )
}

 export const toolHeading:ToolDefinition = {
  type: 'heading',
  isComposited: false,
  name:"Heading", 
  menu:  {category:'basic',icon: <TitleOutlined /> },
  initData: ()=>{
    return {
      type:'heading', 
      data:'heading',
      common:{width:'auto'},
      settings:{level: 2,align:'left'},
   }
  },
  view: (props:{data:any})=><Heading inBlock={false} data={props.data} active={false} onChange={()=>{}} />,
  render: Heading
}