import { TitleOutlined } from '@mui/icons-material'
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../CommonSettings';
import { Util } from '../utils';
import { getCommonBlockCss } from '../Block';


export const Quote = (props:any)=>{
  const [content,setConent] = useState(props.data.data)
  const [commonSettings, setCommonSettings] = useState(props.data.common?props.data.common:{});
  const QuoteRef:any=useRef(null);
  const [isChange,setIsChange] = useState(false);

  const change = (e?: any) => {
    const text=QuoteRef.current.innerText
    setConent(text)
    setIsChange(true)
  }

  const common = {
    onBlur: change,    
    contentEditable: props.active,
    style: { ...commonSettings},
  }
  
  useEffect(()=>{
   if(isChange){
    props.onChange({...props.data,data:content,settings:{common: commonSettings}});
    setIsChange(false)
   }
  },[isChange])

  return (
    <>
       {props.active&&<BlockProperty  blocktype="quote" inBlock={props.inBlock}>
           {Util.renderCustomProperty(props.data)}
           <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true)}} onDelete={props.onDelete}/></div>
        </BlockProperty>}
        <div style={commonSettings} className={getCommonBlockCss('quote')}>
        <q ref={QuoteRef} className='block-quote' {...common} suppressContentEditableWarning>{content}</q>
        </div>
    </> 
  )
  
}


export const toolQuote:ToolDefinition = {
  type: 'quote',
  isComposited: false,
  name:"Quote", 
  menu:  {category:'basic',icon: <TitleOutlined /> },
  initData: ()=>{
    return {type:'quote',
    settings:{},
    data:''
  } 
  },
  render: (props:{data:any, active:boolean})=><Quote {...props} />
}
