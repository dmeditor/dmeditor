import { TitleOutlined } from '@mui/icons-material';
import { RenderMainProps, RenderSettingProps } from '../blocktype';
import { BlockData, BlockLayoutData } from '../types';
import { Ranger } from '../utils/Ranger';
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import React, {useEffect ,useState,useRef} from 'react';
import { AnyAaaaRecord } from 'dns';
import { CommonSettings } from '../CommonSettings';
import { PropertyItem } from '../utils';

let c={
  type:'heading', 
  content:{text:'heading', level: 2 },
  settings:{common:{}}
}

const Heading = (props:any)=>{
    const [text,setText] = useState(props.data.content.text);
    const [level,setLevel] = useState(props.data.content.level);
    const [commonSettings,setCommonSettings] = useState(props.data.settings.common);
    const headRef:any=useRef(null);

    const changeText = (e?:any)=>{
        const texts=headRef.current.innerText
        if(props.onChange){
          setText(texts);
        }
    }

    const common = { onBlur:changeText,ref:headRef, contentEditable: props.active, style:commonSettings}
    const render = ()=>{
      switch(level){
        case 1:
            return <h1  {...common}>{text}</h1>
            break;
        case 2:
            return <h2 {...common}>{text}</h2>
            break;
        case 3:
            return <h3 {...common}>{text}</h3>
            break;
        case 4:
            return <h4 {...common}>{text}</h4>
            break;
        case 5:
            return <h5 {...common}>{text}</h5>
            break;
        default:
            return <h2 {...common}>{text}</h2>
      }
    }

    useEffect(()=>{
      let newData = {type:'heading',content:{text:text, level:level},settings:{common: {...commonSettings}}}
      console.log('new data');
      console.log(newData);
      props.onChange(newData);
    },[text,level,commonSettings])

    return (
      <>
        <BlockProperty title={'Heading'} active={props.active}>
          <PropertyItem label="Level">
                {/* <Ranger defaultValue={content.style.level} min={1} max={5} step={1} onChange={(v:number)=>{update(v)}} /> */}
                <Ranger defaultValue={level} min={1} max={5} step={1} onChange={v=>setLevel(v)} />
          </PropertyItem>       
        <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>setCommonSettings(settings)} /></div>
        </BlockProperty>
        {render()}  
    </> 
    )
}

 export const toolHeading:ToolDefinition = {
  type: 'heading',
  isComposited: false,
  menu:  {text:"Heading", category:'basic',icon: <TitleOutlined /> },
  initData: {type:'heading', 
        content:{ text:'heading', level: 2},
        settings:{},
  },
  view: (props:{data:any})=><Heading data={props.data} active={false} onChange={()=>{}} />,
  render: (props:{data:any, active:boolean})=><Heading {...props} />
}