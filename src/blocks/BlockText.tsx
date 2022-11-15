import { FormatListBulleted,FormatListNumbered,FormatAlignCenter, FormatAlignLeft, FormatAlignRight,FormatAlignJustify,ImageOutlined, TextFormatOutlined } from "@mui/icons-material";
import { Button, Input,Select,MenuItem,FormControl} from "@mui/material";
// import { useState } from "react";
// import { Block } from "../Block";
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";

import React, { useMemo, useRef, useEffect ,useState,useCallback} from 'react';
import {Editor,Transforms,Text,createEditor,Descendant, Range as SlateRange,Element as SlateElement,} from 'slate';
import { Slate, Editable, withReact,ReactEditor, useSlate, useFocused } from 'slate-react';
import { withHistory } from 'slate-history'

import { SlateFun } from '../utils/Slate'
import { Ranger } from "../utils/Ranger";
import { PickColor } from "../utils/PickColor";
import FontFamilyList from '../utils/FontFamilyList'
import {PropertyButton, PropertyGroup, PropertyItem} from '../utils/Property';
import { Util } from '../utils/Util';

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
   if(formats ==='justify'){
    ele = <FormatAlignJustify />
  }
   if(formats ==='numbered-list'){
    ele = <FormatListNumbered />
  }
   if(formats ==='bulleted-list'){
    ele = <FormatListBulleted />
  }
  return ele
}

export const BlockText = (props:any)=>{
    const [size, setSize] = useState(1.1);
    const [familytype,setFamilytype] = useState('')
    const [color,setColor] = useState()
    const [linkstyle,setLinkstyle] = useState('none' as 'none'|'button')
    const [buttonVariant, setButtonVariant] = useState('outlined' as ('contained' | 'outlined' ));
    const [buttonSize, setButtonSize] = useState('small' as ('small' | 'medium' | 'large' ));
    const [value,setValue] = useState(props.data.content.initialValue)
    const [config,setConfig] = useState(props.data.content.config?props.data.content.config:null);
    const [isLinkActive,setIsLinkActive] = useState(false);
    const [isButtonActive,setIsButtonActive] = useState(false);
    const [isCollapsed,setIsCollapsed]= useState(true);
    const [isSelect,setIsSelect]= useState(false);
    const [adding, setAdding] = useState(false);
    const [dialogType, setDialogType] = useState('image' as ('image'|'link'));
    const [linkVal, setLinkVal] = useState('');
    const [linkValType, setLinkValType] = useState('select' as ('select' | 'input'));
    const [linkData, setLinkData] = useState();

    const editor = useMemo(
      () =>SlateFun.withEditor(withHistory(withReact(createEditor()))) ,
      []
    )
    const renderElement = useCallback((props:any) => <SlateFun.Element{...props} />, [])
    const renderLeaf = useCallback((props:any) => <SlateFun.Leaf {...props} />, [])

    const change = (val:any)=>{
      setValue(val)
      props.onChange({type:'text',content:{initialValue:val}});
    }

    const changeFontFormat = (v:any,format:any,e?:any)=>{
      if(e){
        e.preventDefault()
      }
      if(format === 'fontSize'){
        setSize(v)
      }
      if(format === 'color'){
        setColor(v)
      }
      if(format === 'fontFamily'){
        setFamilytype(v)
      }
      setIsSelect(!isSelect)
      SlateFun.toggleFormat(editor,format,v)
    }
    const IsShowToolBar = (type:any,format:string)=>{
      return config?(config[type].includes(format)?true:false):true
    }
    const changeLinkFormat = (v:any)=>{
      setLinkstyle(v)
      // SlateFun.setButtonFormat(editor,'',v)
      SlateFun.setLinkFormat(editor,v)
      // SlateFun.insertLink(editor,value,linkValType,v)
      setIsLinkActive(v==='none'?true:false)
      setIsButtonActive(v==='button'?true:false)
      setButtonVariant('outlined')
      setButtonSize('small')
    }
    const changeButtonFormat = (v:any,format:any)=>{
      if(format === 'variant'){
        setButtonVariant(v)
      }
      if(format === 'size'){
        setButtonSize(v)
      }
      let value=linkVal
      // SlateFun.toggleButtonFormat(editor,format,v)
      SlateFun.setLinkFormat(editor,'button',format,v)
    }

    //insert image
    const handleClickOpen = (event:any)=>{
      event.preventDefault()
      setDialogType('image')
      setAdding(true);
      setAdding(false);
      setTimeout(()=>{setAdding(true);},10)
    }
    const submitImage = (val:any,type:string)=>{
      SlateFun.insertImage(editor, val,type)
    }
    //inset Link
    const changeDialogLinkfun = (value:any)=>{
      setLinkVal(value);
      setDialogType('link')
      setAdding(true);
      setAdding(false);
      setTimeout(()=>{setAdding(true);},10)
    }
    const submitLink = (value:any,type:any)=>{
      setLinkValType(type);
      SlateFun.insertLink(editor,value,type)
    }
    const submitFun = (val:any,type:string)=>{
      if(dialogType=='image'){
        submitImage(val,type)
      }
      if(dialogType=='link'){
        submitLink(val,type)
      }
    }
    
    useEffect(()=>{
      ReactEditor.focus(editor)
    },[isSelect])

    return (
      <div>
        <Slate editor={editor} value={value} onChange={v => change(v)}>
          <BlockProperty title={'Text'} active={props.active}>
          <PropertyGroup header="Basic">
            {IsShowToolBar('font','font_family')?
                <div>
                  <PropertyItem label="Font">
                      <Select
                      size="small"
                      fullWidth
                        value={familytype?familytype:''}
                        onChange={(e)=>{changeFontFormat(e.target.value,'fontFamily')}}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="" onMouseUp={(e)=>{e.preventDefault()}}>
                          <em>Default</em>
                        </MenuItem>
                        {FontFamilyList.map((font, index) => (
                          <MenuItem key={index} value={font.name} onMouseUp={(e)=>{e.preventDefault()}}>
                            <span style={{fontFamily: font.name}}>{font.name}</span>
                          </MenuItem>
                        ))
                        }
                      </Select>
                  </PropertyItem>
                </div>
                :null
              }
            {!isCollapsed?
            <>              
              {IsShowToolBar('font','font size')?
                <PropertyItem label='Size'>
                    <Ranger min={8} max={36} step={2} onChange={(v:number,e:any)=>changeFontFormat(v,'fontSize',e)} defaultValue={size?size:14} />
                </PropertyItem>  
                :null
              }
              {IsShowToolBar('font','color')?
                <PropertyItem label='Color'>
                    <PickColor color={color?color:'#000'} onChange={(v:any)=>changeFontFormat(v,'color')} />
                </PropertyItem> 
                :null
              }
            </>
            :null
          }
            <div>
            <PropertyItem label="Align">
                  {IsShowToolBar('tools','align')?SlateFun.TEXT_ALIGN_TYPES.map((format:any,index:any)=>{           
                      return (
                      <PropertyButton title={SlateFun.getToolText(format)} key={index} onClick={()=>{SlateFun.toggleBlock(editor, format)}}
                        selected={SlateFun.isBlockActive(editor,format,SlateFun.TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}>
                        <BlockButton formats={format} />
                      </PropertyButton>    
                      )             
                    }
                  ):null}
                </PropertyItem>
              </div>

            {IsShowToolBar('tools','align')||IsShowToolBar('tools','order_list')||IsShowToolBar('tools','list')?
              <PropertyItem label="List">
                {IsShowToolBar('tools','list')||IsShowToolBar('tools','order_list')?
                  SlateFun.LIST_TYPES.filter((item:any)=>
                    (item==='numbered-list' && IsShowToolBar('tools','order_list'))|| (item==='bulleted-list'&&IsShowToolBar('tools','list'))
                  ).map((format:any,index:any)=>{          
                      return (
                      <PropertyButton title={SlateFun.getToolText(format)} key={index} onClick={()=>{SlateFun.toggleBlock(editor, format)}} 
                      selected={SlateFun.isBlockActive(editor,format,SlateFun.TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}>
                        <BlockButton formats={format} />
                      </PropertyButton>    
                      )             
                    }
                  )
                  :null}
              </PropertyItem>   
              :null
            }
            </PropertyGroup>
            <PropertyGroup header="Insert">
              {IsShowToolBar('tools','image')?
              <PropertyItem label='Insert'>
                <PropertyButton title='Image' onClick={(e)=>{handleClickOpen(e)}}>
                  <ImageOutlined />
                </PropertyButton>               
              </PropertyItem> 
              :null
              }  
            </PropertyGroup> 
            {  isLinkActive||isButtonActive?
            <PropertyGroup header="Link"> 
              <PropertyItem label="Style">
                    <Select
                      value={linkstyle?linkstyle:'none'}
                      onChange={(e)=>{changeLinkFormat(e.target.value)}}
                      displayEmpty
                      size='small'
                      inputProps={{'aria-label': 'Without label' }}
                    >
                      <MenuItem value="none">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem  value="button">
                        Button
                      </MenuItem>
                    </Select>
            </PropertyItem> 
            </PropertyGroup>
            :null}
            {}
            {  (isLinkActive&&linkstyle==='button')||isButtonActive?
             <>
              <div>
                <label>Button style:</label>
                <div>
                  <Button onClick={()=>{changeButtonFormat('contained','variant');}} variant={buttonVariant==='contained'?'outlined':undefined}  >Fill</Button>
                  <Button onClick={()=>{changeButtonFormat('outlined','variant');}} variant={buttonVariant==='outlined'?'outlined':undefined}   >Ourlined</Button>
                </div>
              </div> 
              <div>
                <label>Button size:</label>
                <div>
                  <Button onClick={()=>{changeButtonFormat('small','size');}} variant={buttonSize==='small'?'outlined':undefined} >small </Button>
                  <Button onClick={()=>{changeButtonFormat('medium','size');}} variant={buttonSize==='medium'?'outlined':undefined}   >medium</Button>
                  <Button onClick={()=>{changeButtonFormat('large','size');}} variant={buttonSize==='large'?'outlined':undefined}  >large</Button>
                </div>
              </div> 
            </>
            :null}
                 
          </BlockProperty>
          <div>
            <SlateFun.HoveringToolbar config={config?config.hover_toolbar:null} changeDialogLink={changeDialogLinkfun}/>
            <Editable
                readOnly={props.view?props.view:false}
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                placeholder="Enter some plain text..." 
                onMouseUp={(event:any)=>{
                  setFamilytype(SlateFun.getFormat(editor,'fontFamily'))
                  setSize(SlateFun.getFormat(editor,'fontSize'))
                  setColor(SlateFun.getFormat(editor,'color'))
                  setTimeout(()=>{
                    setIsCollapsed(SlateFun.isCollapsed(editor))
                  },10)
                  setLinkstyle('none')
                  setIsLinkActive(SlateFun.isLinkActive(editor)?true:false)
                  setIsButtonActive(SlateFun.isLinkButtonActive(editor)?true:false)

                  if(SlateFun.isLinkButtonActive(editor)){
                    let button:any=SlateFun.getLinkSetting(editor)
                    let newButton:any=JSON.parse(JSON.stringify(button))
                    setLinkstyle('button')
                    setButtonVariant(newButton.styleConfig.setting.variant)
                    setButtonSize(newButton.styleConfig.setting.size)
                    
                  }






                  // setIsButtonActive(SlateFun.isButtonActive(editor)?true:false)
                  // setTimeout(()=>{
                  //   setIsCollapsed(SlateFun.isCollapsed(editor))
                  // },10)
                  // if(SlateFun.isButtonActive(editor)){
                  //   let button:any=SlateFun.getbuttonSetting(editor)
                  //   let newButton:any=JSON.parse(JSON.stringify(button))
                  //   if(!newButton.hasOwnProperty('setting')){
                  //     let setting:any={
                  //       size:'small',
                  //       variant:'contained'
                  //     }
                  //     newButton.setting=setting
                  //   }
                  //     setLinkstyle('button')
                  //     setButtonVariant(newButton.setting.variant)
                  //     setButtonSize(newButton.setting.size)
                    
                  // }
                }}
                onDOMBeforeInput={(event: InputEvent) => {
                  switch (event.inputType) {
                    case 'formatBold':
                      event.preventDefault()
                      return SlateFun.toggleFormat(editor, 'bold')
                    case 'formatItalic':
                      event.preventDefault()
                      return SlateFun.toggleFormat(editor, 'italic')
                    case 'formatUnderline':
                      event.preventDefault()
                      return SlateFun.toggleFormat(editor, 'underlined')
                  }
                }}
            />
          </div>
        </Slate>
        {adding&&<div>
          <Util.renderBroseURL type={dialogType=='image'?'Image':"Link"} onConfirm={submitFun} adding={adding} defalutValue={dialogType=='link'?linkVal:''}/>

          {/* {dialogType=='image'&& Util.renderBrowseImage({onConfirm:submitImage,adding:adding})}
          {dialogType=='link'&& Util.renderBrowseLink({onConfirm:submitLink,adding:adding,defalutValue:linkVal})} */}
        </div>}
      </div> 
    )
}


export const toolText:ToolDefinition = {
    type: 'text',
    isComposited: false,
    menu:  {text:"Text", category:'basic',icon: <TextFormatOutlined /> },
    initData: {
      type:'text',
      content:{ 
        initialValue:[
          {type: 'paragraph',
          children:[ 
            {
              text: 'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
            }
            ]
          }
        ],
      }
    },
    view: (props:{data:any})=><BlockText data={props.data} active={false} onChange={()=>{}} view={true}/>,
    render: (props:{data:any, active:boolean, onChange:(data:any)=>void})=><BlockText {...props} />
}