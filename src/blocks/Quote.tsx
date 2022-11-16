import { TitleOutlined } from '@mui/icons-material'
import { RenderMainProps, RenderSettingProps } from '../blocktype'
import { BlockData, BlockLayoutData } from '../types'
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../CommonSettings';


export const Quote = (props:any)=>{
    // const changeCommon = (settings: BlockLayoutData) => {
    //   let data = props.data
    //   data.layout = settings
    //   props.onSetting(data)
    // }
   const [content,setConent] = useState(props.data.content)
   const [commonSettings, setCommonSettings] = useState(props.data.settings.commonSettings);

   const QuoteRef:any=useRef(null);
  const change = (e?: any) => {
    const text=QuoteRef.current.innerText
    let newData={...content};
    newData.data=text
    setConent(newData)
    props.onChange({type:'quote',content:newData, settings:{common: commonSettings}});
  }

  const common = {
    onBlur: change,
    contentEditable: props.active,
    style: { ...content.layout },
  }

  // const changeCommon = (settings: any) => {
  //   let data = {...content};
  //   data.layout = settings
  //   setConent(data)
  //   console.log(data)
  //   // props.onSetting(data)
  // }
  useEffect(()=>{
    change();
  },[props.active])

  return (
    <>
        <BlockProperty title={'Quote'} active={props.active}>
           <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>setCommonSettings(settings)} /></div>
        </BlockProperty>
        <div style={commonSettings}>
        <q ref={QuoteRef} className='block-quote' {...common} >{content.data}</q>
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
