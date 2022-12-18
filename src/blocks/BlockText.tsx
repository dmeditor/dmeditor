import { FormatListBulleted,FormatListNumbered,FormatAlignCenter, FormatAlignLeft, FormatAlignRight,FormatAlignJustify,ImageOutlined, TextFormatOutlined,BorderColorOutlined,LinkOffOutlined } from "@mui/icons-material";
import { Button, Input,Select,MenuItem,TextField} from "@mui/material";
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
import { CommonSettings } from "../CommonSettings";

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
    const [value,setValue] = useState(props.data.data)
    const [config,setConfig] = useState(props.data.settings?props.data.settings.config:null);
    const [adding, setAdding] = useState(false);
    const [commonSettings, setCommonSettings] = useState(props.data.common);

    const [size, setSize] = useState(1.1);
    const [familytype,setFamilytype] = useState('')
    const [color,setColor] = useState()
    const [linkstyle,setLinkstyle] = useState('none' as 'none'|'button')
    const [buttonVariant, setButtonVariant] = useState('outlined' as ('contained' | 'outlined' ));
    const [buttonSize, setButtonSize] = useState('small' as ('small' | 'medium' | 'large' ));
    const [isFocus,setIsFocus] = useState(false);
    const [isLinkActive,setIsLinkActive] = useState(false);
    const [isButtonActive,setIsButtonActive] = useState(false);
    const [isCollapsed,setIsCollapsed]= useState(true);
    const [dialogType, setDialogType] = useState('image' as ('image'|'link'));
    const [linkVal, setLinkVal] = useState("" as any);
    const [isChange,setIsChange] = useState(false)
    const firstRender = useRef(true);

    const editor = useMemo(
      () =>SlateFun.withEditor(withHistory(withReact(createEditor()))) ,
      []
    )
    const renderElement = useCallback((props:any) => <SlateFun.Element{...props} />, [])
    const renderLeaf = useCallback((props:any) => <SlateFun.Leaf {...props} />, [])

    const change = (val:any)=>{
      setValue(val)
    }

    useEffect(()=>{
        if (firstRender.current) {
          firstRender.current = false;
        }else{
          props.onChange({...props.data,data:value, common: commonSettings}, true);
          setIsChange(false)
        }
    },[value,commonSettings])

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
      SlateFun.toggleFormat(editor,format,v)
      setIsCollapsed(SlateFun.isCollapsed(editor))
      setIsFocus(!isFocus)
    }
    const IsShowToolBar = (type:any,format:string)=>{
      return config?(config[type].includes(format)?true:false):true
    }
    const changeLinkFormat = (v:any)=>{
      setLinkstyle(v)
      // SlateFun.setButtonFormat(editor,'',v)
      SlateFun.setLinkFormat(editor,v)
      setIsLinkActive(v==='none'?true:false)
      setIsButtonActive(v==='button'?true:false)
      setButtonVariant('outlined')
      setButtonSize('small')
      setIsFocus(!isFocus)
    }
    const changeButtonFormat = (v:any,format:any)=>{
      if(format === 'variant'){
        setButtonVariant(v)
      }
      if(format === 'size'){
        setButtonSize(v)
      }
      SlateFun.setLinkFormat(editor,'button',format,v)
      setIsFocus(!isFocus)
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
      setIsFocus(!isFocus)
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
      SlateFun.insertLink(editor,value,type)
      SlateEvents()
      setIsFocus(!isFocus)
    }
    const submitFun = (val:any,type:string)=>{
      if(dialogType=='image'){
        submitImage(val,type)
      }
      if(dialogType=='link'){
        submitLink(val,type)
      }
    }
    const SlateEvents = ()=>{
      setFamilytype(SlateFun.getFormat(editor,'fontFamily'))
      setSize(SlateFun.getFormat(editor,'fontSize'))
      setColor(SlateFun.getFormat(editor,'color'))
      setTimeout(()=>{
        setIsCollapsed(SlateFun.isCollapsed(editor))
      },10)

      //link
      setLinkstyle('none')
      setIsLinkActive(SlateFun.isLinkActive(editor)?true:false)
      setIsButtonActive(SlateFun.isLinkButtonActive(editor)?true:false)
      if(SlateFun.isLinkActive(editor)){
        let button:any=SlateFun.getLinkSetting(editor)
        setLinkVal(button)
        if(SlateFun.isLinkButtonActive(editor)){
          let newButton:any=JSON.parse(JSON.stringify(button))
          setLinkstyle('button')
          setButtonVariant(newButton.styleConfig.setting.variant)
          setButtonSize(newButton.styleConfig.setting.size)
        }
      }
    }
    
    useEffect(()=>{
      ReactEditor.focus(editor)
    },[isFocus])

    return (
      <div style={...commonSettings}>
        <Slate editor={editor} value={value} onChange={v => change(v)}>
        {props.active&&<BlockProperty  blocktype="text" inBlock={props.inBlock}>
          <PropertyGroup header="Basic">
            {IsShowToolBar('font','font_family')?
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
                :null
              }
            {(!isCollapsed||isLinkActive)&&IsShowToolBar('font','font size')&&
              <PropertyItem label='Size'>
                  <Ranger min={8} max={36} step={2} onChange={(v:number,e:any)=>changeFontFormat(v,'fontSize',e)} defaultValue={size?size:14} />
              </PropertyItem>  
            }
            {!isCollapsed&&IsShowToolBar('font','color')&&
              <PropertyItem label='Color'>
                  <PickColor color={color?color:'#000'} onChange={(v:any)=>changeFontFormat(v,'color')} />
              </PropertyItem> 
            }
            {!isButtonActive&&<>
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
              </>
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
            <PropertyItem label="content">
              <div style={{overflow: 'hidden',textOverflow:'ellipsis', whiteSpace: 'nowrap'}} 
                title={linkVal.source.sourceType==='select'?'{link:'+linkVal.source.sourceData.content_type+','+linkVal.url+'}':linkVal.url}>
                {linkVal.source.sourceType==='select'?'{link:'+linkVal.source.sourceData.content_type+','+linkVal.url+'}':linkVal.url}
              </div>
              <PropertyButton title={'Edit Link'} onClick={()=>{changeDialogLinkfun(linkVal)}}><BorderColorOutlined/></PropertyButton> 
              <PropertyButton title={'Delete Link'} onClick={()=>{ SlateFun.unwrapLink(editor);SlateEvents()}}><LinkOffOutlined/></PropertyButton> 
            </PropertyItem> 
          </PropertyGroup>
          :null}
          {  (isLinkActive&&linkstyle==='button')||isButtonActive?
            <>
            <PropertyGroup header="Link Button"> 
              <PropertyItem label="style">
                <Button size="small" onClick={()=>{changeButtonFormat('contained','variant');}} variant={buttonVariant==='contained'?'outlined':undefined}  >Fill</Button>
                <Button size="small" onClick={()=>{changeButtonFormat('outlined','variant');}} variant={buttonVariant==='outlined'?'outlined':undefined}   >Ourlined</Button>
              </PropertyItem> 
              <PropertyItem label="size">
                <Button size="small" onClick={()=>{changeButtonFormat('small','size');}} variant={buttonSize==='small'?'outlined':undefined} >small </Button>
                <Button size="small" onClick={()=>{changeButtonFormat('medium','size');}} variant={buttonSize==='medium'?'outlined':undefined}   >medium</Button>
                <Button size="small" onClick={()=>{changeButtonFormat('large','size');}} variant={buttonSize==='large'?'outlined':undefined}  >large</Button>
              </PropertyItem> 
          </PropertyGroup>
          </>
          :null}
          {Util.renderCustomProperty(props.data)}
         <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true)}} /></div>                 
          </BlockProperty>}
          <div>
            <SlateFun.HoveringToolbar config={config?config.hover_toolbar:null}  changeDialogLink={changeDialogLinkfun}/>
            <Editable
                readOnly={props.view?props.view:false}
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                placeholder="Input your content here" 
                onMouseUp={(event:any)=>{
                  SlateEvents()
                }}
                onKeyUp={(event:any)=>{
                  SlateEvents()
                 }
                }
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
        </div>}
      </div> 
    )
}


export const toolText:ToolDefinition = {
    type: 'text',
    name: 'Text',
    isComposited: false,
    menu:  {category:'basic',icon: <TextFormatOutlined /> },
    initData: ()=>{
      return {
        type:'text',
        data:[
            {type: 'paragraph',
            children:[ 
              {
                text: '',
                // text: 'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
              }
              ]
            }
          ],
      }
  },
    view: (props:{data:any})=><BlockText data={props.data} active={false} onChange={()=>{}} view={true}/>,
    render: (props:{data:any, active:boolean, onChange:(data:any)=>void})=><BlockText {...props} />
}