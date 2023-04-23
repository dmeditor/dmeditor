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
    const [id,setId] = useState(props.data.settings?.id||'');
    const [commonSettings,setCommonSettings] = useState(props.data.common?props.data.common:{});
    const defaultValue:any=useRef(props.data.data);    
    const changeText = (e?:any)=>{
      const texts=e.target.innerText
      setText(texts);
    }

    const common = { ref: (input:any) => input && input.focus(),  onKeyUp:changeText, ...(id?{id:id}:{}), contentEditable: props.active, style:{...commonSettings},}

    const render = ()=>{
      switch(level){
        case 1:
            return <h1 suppressContentEditableWarning {...common}>{defaultValue.current}</h1>
        case 2:
            return <h2  suppressContentEditableWarning {...common}>{defaultValue.current}</h2>
        case 3:
            return <h3 suppressContentEditableWarning {...common}>{defaultValue.current}</h3>
        case 4:
            return <h4 suppressContentEditableWarning {...common}>{defaultValue.current}</h4>
        case 5:
            return <h5 suppressContentEditableWarning {...common}>{defaultValue.current}</h5>
        default:
            return <h2 suppressContentEditableWarning {...common}>{defaultValue.current}</h2>
      }
    }

    const autoCreateId = ()=>{
      const texts=text
      let newId = texts.trim().replace(/\s/g,'-').replace(/[^\w\-]/g,'').toLowerCase()
      setId(newId)
    }   

    useEffect(()=>{
      let newData = {...props.data,data:text,settings:{level:level,id:id}, common: {...commonSettings}}
      props.onChange(newData);
    },[level, text, id, commonSettings])

    return (
      <>
        {props.active&&<BlockProperty  blocktype="heading" inBlock={props.inBlock}>
          <PropertyItem label="Level">
                <Ranger defaultValue={level} min={1} max={5} step={1} onChange={(v:any)=>{setLevel(v)}} />
          </PropertyItem>            
          <PropertyItem label="Anchor">
            <TextField sx={{width:'calc(100% - 37px)'}}  placeholder='Please enter ID'  value={id} size="small" hiddenLabel variant="outlined" onChange={(e)=>{setId(e.target.value);}} />
            <PropertyButton title="Auto generate Id" onClick={()=>{autoCreateId()}}>
              <LoopOutlined/>
            </PropertyButton> 
          </PropertyItem>  
          {Util.renderCustomProperty(props.data)}
        <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings);}} /></div>
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
      data:'',
      common:{width:'auto'},
      settings:{level: 2},
   }
  },
  view: (props:{data:any})=><Heading inBlock={false} data={props.data} active={false} onChange={()=>{}} />,
  render: Heading
}