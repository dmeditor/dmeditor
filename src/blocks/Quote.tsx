import { TitleOutlined } from '@mui/icons-material'
import { RenderMainProps, RenderSettingProps } from '../blocktype'
import { BlockData, BlockLayoutData } from '../types'
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../CommonSettings';
import { PropertyItem } from '../utils';
import { Util } from '../utils/Util';


export const Quote = (props:any)=>{
  const [content,setConent] = useState(props.data.content)
  const [commonSettings, setCommonSettings] = useState(props.data.settings?props.data.settings.common:{});
  let defalutProperty=props.data.dm_field?props.data.dm_field:''
  const QuoteRef:any=useRef(null);

  const change = (e?: any) => {
    const text=QuoteRef.current.innerText
    setConent(text)
    props.onChange({...props.data,content:text,settings:{common: commonSettings}});
  }

  const common = {
    onBlur: change,
    contentEditable: props.active,
    style: { ...commonSettings},
  }
  
  useEffect(()=>{
    change();
  },[content,commonSettings])

  return (
    <>
        <BlockProperty title={'Quote'} active={props.active}>
        <PropertyItem label="property">
            {Util.renderCustomProperty({defalutProperty:defalutProperty})}
          </PropertyItem> 
           <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>setCommonSettings(settings)} /></div>
        </BlockProperty>
        <div style={commonSettings}>
        <q ref={QuoteRef} className='block-quote' {...common} >{content}</q>
        </div>
    </> 
  )
  
}


export const toolQuote:ToolDefinition = {
  type: 'quote',
  isComposited: false,
  menu:  {text:"Quote", category:'basic',icon: <TitleOutlined /> },
  initData: {type:'quote',
    settings:{},
    content:'quotetest'
  },
  view: (props:{data:any})=><Quote data={props.data} active={false} onChange={()=>{}} />,
  render: (props:{data:any, active:boolean})=><Quote {...props} />
}
