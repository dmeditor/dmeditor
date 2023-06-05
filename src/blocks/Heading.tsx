import { TitleOutlined,FormatAlignLeft,FormatAlignCenter,FormatAlignRight,LoopOutlined } from '@mui/icons-material';
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import React, {useEffect ,useState,useRef} from 'react';
import { CommonSettings } from '../CommonSettings';
import { PropertyItem,PropertyButton,Util,Ranger} from '../utils';
import TextField from '@mui/material/TextField';
import { StyleSettings } from '../styles/StyleSettings';
import { getCommonBlockCss, getStyleCss } from '../Block';

const Heading = (props:ToolRenderProps)=>{
    const [text,setText] = useState(props.data.data);
    const [level,setLevel] = useState(props.data.settings.level);
    const [id,setId] = useState(props.data.settings?.id||'');
    const [template, setTemplate] = useState(props.data.template);
    const [commonSettings,setCommonSettings] = useState(props.data.common?props.data.common:{});
    const defaultValue:any=useRef(props.data.data);    
    const changeText = (e?:any)=>{
      const texts=e.target.innerText
      setText(texts);
    }

    const common = { ref: (input:any) => input && input.focus(),  onKeyUp:changeText, ...(id?{id:id}:{}), contentEditable: props.active}

    const render = ()=>{
      switch(level){
        case 1:
            return <h1 {...common} suppressContentEditableWarning>{defaultValue.current}</h1>
        case 2:
            return <h2 {...common} suppressContentEditableWarning>{defaultValue.current}</h2>
        case 3:
            return <h3 {...common} suppressContentEditableWarning>{defaultValue.current}</h3>
        case 4:
            return <h4 {...common} suppressContentEditableWarning>{defaultValue.current}</h4>
        case 5:
            return <h5 {...common} suppressContentEditableWarning>{defaultValue.current}</h5>
        default:
            return <h2 {...common} suppressContentEditableWarning>{defaultValue.current}</h2>
      }
    }

    const autoCreateId = ()=>{
      const texts=text
      let newId = texts.trim().replace(/\s/g,'-').replace(/[^\w\-]/g,'').toLowerCase()
      setId(newId)
    }     

    useEffect(()=>{
        let newData = {...props.data,data:text,settings:{level:level,id:id}, common: {...commonSettings}, template: template}
        props.onChange(newData, true);
    },[text, level, id, commonSettings, template])

    return (
      <>
        {props.active&&<BlockProperty  blocktype="heading" inBlock={props.inBlock}>
          <PropertyItem label="Level">
                <Ranger defaultValue={level} min={1} max={5} step={1} onChange={(v:any)=>{setLevel(v); defaultValue.current = text;}} />
          </PropertyItem>            
          <PropertyItem label="Anchor">
            <TextField sx={{width:'calc(100% - 37px)'}}  placeholder='Please enter ID'  value={id} size="small" hiddenLabel variant="outlined" onChange={(e)=>{setId(e.target.value);}} />
            <PropertyButton title="Auto generate Id" onClick={()=>{autoCreateId()}}>
              <LoopOutlined/>
            </PropertyButton> 
          </PropertyItem>  
          {Util.renderCustomProperty(props.data)}
            <StyleSettings template={props.data.template||''} blocktype='heading' onChange={(identifier)=>{setTemplate(identifier)}} />
            <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings);}} onDelete={props.onDelete} /></div>
        </BlockProperty>}
        <div style={...commonSettings} className={getCommonBlockCss('heading', template)}>
          {render()}
        </div>
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
  render: Heading
}