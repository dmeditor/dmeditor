import { TitleOutlined } from '@mui/icons-material'
import { RenderMainProps, RenderSettingProps } from '../blocktype'
import { BlockData, BlockLayoutData } from '../types'
import { CommonSetting } from '../Property'
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";
import { useState,useEffect } from 'react'


export const Quote = (props:any)=>{
    // const changeCommon = (settings: BlockLayoutData) => {
    //   let data = props.data
    //   data.layout = settings
    //   props.onSetting(data)
    // }
   const [content,setConent] = useState(props.data.content)
  useEffect(()=>{
    console.log(props)
  },[])
  
  const change = (e: any) => {
    const text = e.target.innerText
    console.log(text)
    let newData={...content};
    newData.data=text
    setConent(newData)
    console.log(newData)
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

  return (
    <>
        <BlockProperty title={'Quote'} active={props.active}>
          {/* <CommonSetting settings={content.layout} onChange={changeCommon} /> */}
        </BlockProperty>
        <q className='block-quote' {...common} >{content.data}</q>
    </> 
  )
  
}


export const toolQuote:ToolDefinition = {
  type: 'quote',
  isComposited: false,
  menu:  {text:"Quote", category:'basic',icon: <TitleOutlined /> },
  initData: {type:'quote', content:{
    layout:{},
    data:'quotetest'
  }},
  render: (props:{data:any, active:boolean})=><Quote {...props} />
}
