import { TitleOutlined } from '@mui/icons-material';
import { RenderMainProps, RenderSettingProps } from '../blocktype';
import { BlockData, BlockLayoutData } from '../types';
import { CommonSetting } from '../Property';
import { Ranger } from '../utils/Ranger';
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";
import React, {useEffect ,useState,useRef} from 'react';
import { AnyAaaaRecord } from 'dns';

export interface DataHeading{
    text: string,
    style: {
        level: number
    }
}

let c={
  type:'heading', 
  content:{
    layout:{padding: 0},
    data: {text:'heading', style:{level: 2}}
  }
}
const Heading = (props:any)=>{
    const [content,setContet] = useState(props.data.content.data as DataHeading );
    const [text,setText] = useState(props.data.content.data.text);
    const [style,setStyle] = useState(props.data.content.data.style);
    const [layout,setLayout] = useState(props.data.content.layout);
    const headRef:any=useRef(null);

   
    const change = (e?:any)=>{
        const texts=headRef.current.innerText
        if(props.onChange){
          setText(texts);
        }
    }
    const changeS = ()=>{
      let newData=JSON.parse(JSON.stringify({...props.data.content}));
        newData.data.text=text;
        newData.data.style=style;
        newData.layout=layout;
        props.onChange({type:'heading',content:newData});
    } 
    const common = { onBlur:change,ref:headRef, contentEditable: props.active, style:layout}
    const render = ()=>{
      switch(style.level){
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
    const update = (v:number)=>{
      let c={...style};
      c.level=v;
      setStyle(c);
    }
    const changeCommon = (settings:BlockLayoutData)=>{
      setLayout(settings);
    }
    useEffect(()=>{
      change()
    },[props.active])

    useEffect(()=>{
      changeS();
    },[text,style,layout])

    return (
      <>
        <BlockProperty title={'Heading'} active={props.active}>
        <table style={{width: '100%'}}>
          <tbody>
              <tr><td style={{width: '50px'}}>                
                  <label>Level</label></td><td>
                  {/* <Ranger defaultValue={content.style.level} min={1} max={5} step={1} onChange={(v:number)=>{update(v)}} /> */}
                  <Ranger defaultValue={style.level} min={1} max={5} step={1} onChange={update} />
                  </td></tr>                       
          </tbody>
        </table>
          <CommonSetting settings={layout} onChange={changeCommon} />
        </BlockProperty>
        {render()}  
    </> 
    )
}


// const HeadingSettings = (props:RenderSettingProps)=>{

//     let style = (props.data.data as DataHeading).style;

//     const update = ()=>{
//         let content = props.data.data as DataHeading;
//         content.style = {...content.style, ...style};
//         let newData = props.data;
//         newData.data = content;
//         props.onSetting(newData);
//     }

//     const changeCommon = (settings:BlockLayoutData)=>{
//         let data = props.data;
//         data.layout = settings;
//         props.onSetting(data);
//     }

//     return <div>
//         <label>Heading</label>
    //     <table style={{width: '100%'}}>
    //     <tbody>
    //         <tr><td style={{width: '50px'}}>                
    //             <label>Level</label></td><td>
    //             <Ranger defaultValue={style.level} min={1} max={5} step={1} onChange={(v:number)=>{style.level=v;update()}} />
    //             </td></tr>                       
    //     </tbody>
    // </table>
//     <CommonSetting  settings={props.data.layout}  onChange={changeCommon}/>
//     </div>
//  }

 export const toolHeading:ToolDefinition = {
  type: 'heading',
  isComposited: false,
  menu:  {text:"Heading", category:'basic',icon: <TitleOutlined /> },
  initData: {type:'heading', content:{
    layout:{padding: 0},
    data: {text:'heading', style:{level: 2}}
  }},
  view: (props:{data:any})=><Heading data={props.data} active={false} onChange={()=>{}} />,
  render: (props:{data:any, active:boolean})=><Heading {...props} />
}