import { FormatListBulleted,FormatListNumbered,FormatAlignCenter, FormatAlignLeft, FormatAlignRight,FormatAlignJustify,ImageOutlined, TextFormatOutlined } from "@mui/icons-material";
import { Button, Input,Select,MenuItem,FormControl} from "@mui/material";
// import { useState } from "react";
// import { Block } from "../Block";
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";

import React, { useMemo, useRef, useEffect ,useState,useCallback} from 'react';
import {Editor,Transforms,Text,createEditor,Descendant, Range as SlateRange,Element as SlateElement,} from 'slate';
import { Slate, Editable, withReact, useSlate, useFocused } from 'slate-react';
import { withHistory } from 'slate-history'

import { SlateFun } from '../utils/Slate'
import { Ranger } from "../utils/Ranger";
import { PickColor } from "../utils/PickColor";
import FontFamilyList from '../utils/FontFamilyList'

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
    // if(!props.data.content){
    //   props.data.content= {
    //       initialValue:[],
    //       config:{
    //         hover_toolbar:['bold','italic','underline','link','linkoff'],
    //         font: ["font_family", "font size", "color"],
    //         tools: ["list", "order_list", "align", "image"]
    //       }
    //   }
    // }
    const [size, setSize] = useState(1.1);
    // const [align, setAlign] = useState('left' as 'left'|'center'|'right');
    const [familytype,setFamilytype] = useState('Abel')
    const [color,setColor] = useState()
    const [linkstyle,setLinkstyle] = useState('none' as 'none'|'button')
    const [buttonVariant, setButtonVariant] = useState('contained' as ('contained' | 'outlined' ));
    const [buttonSize, setButtonSize] = useState('small' as ('small' | 'medium' | 'large' ));
    const [value,setValue] = useState(props.data.content.initialValue)
    const [config,setConfig] = useState(props.data.content.config?props.data.content.config:null);
    const [isLinkActive,setIsLinkActive] = useState(false);
    const [isButtonActive,setIsButtonActive] = useState(false);
    const [isCollapsed,setIsCollapsed]= useState(true);

    const editor = useMemo(
      () =>SlateFun.withEditor(withHistory(withReact(createEditor()))) ,
      []
    )
    const renderElement = useCallback((props:any) => <SlateFun.Element{...props} />, [])
    const renderLeaf = useCallback((props:any) => <SlateFun.Leaf {...props} />, [])

    const change = (val:any)=>{
      setValue(val)
      props.onSave({type:'text',content:{initialValue:val}});
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
      
      SlateFun.toggleFormat(editor,format,v)
    }
    const IsShowToolBar = (type:any,format:string)=>{
      return config?(config[type].includes(format)?true:false):true
    }
    const changeLinkFormat = (v:any)=>{
      setLinkstyle(v)
      SlateFun.setButtonFormat(editor,'',v)
    }
    const changeButtonFormat = (v:any,format:any)=>{
      if(format === 'variant'){
        setButtonVariant(v)
      }
      if(format === 'size'){
        setButtonSize(v)
      }
      SlateFun.toggleButtonFormat(editor,format,v)
    }

    return (
      <div>
        <Slate editor={editor} value={value} onChange={v => change(v)} >
          <BlockProperty title={'Text'} active={props.active}>
            {!isCollapsed?
            <>
              {IsShowToolBar('font','font_family')?
                <div>
                  <label>Family:</label>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" id="ddddsededesfsds"> 
                      <Select
                      id="ddd--5555"
                        value={familytype?familytype:'Abel'}
                        onChange={(e)=>{changeFontFormat(e.target.value,'fontFamily')}}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="none">
                          <em>None</em>
                        </MenuItem>
                        {FontFamilyList.map((font, index) => (
                          <MenuItem key={index} value={font.name}>
                            {font.name}
                          </MenuItem>
                        ))
                        }
                      </Select>
                    </FormControl>
                </div>
                :null
              }
              {IsShowToolBar('font','font size')?
                <div>
                    <label>Font size:</label>
                    <Ranger min={0} max={100} step={1} onChange={(v:number,e:any)=>changeFontFormat(v,'fontSize',e)} defaultValue={size?size:14} />
                    {/* <Input type='text' defaultValue={size} onChange={(e)=>setSize(parseFloat(e.target.value))} /> */}
                </div>  
                :null
              }
              {IsShowToolBar('font','color')?
                <div>
                  <label>Color:</label>
                  <div>
                    <PickColor color={color?color:'#000'} onChange={(v:any)=>changeFontFormat(v,'color')} />
                  </div>
                </div> 
                :null
              }
            </>
            :null
          }
            <div>
                <label>Align</label>
                <div>
                  {IsShowToolBar('tools','align')?SlateFun.TEXT_ALIGN_TYPES.map((format:any,index:any)=>{           
                      return (
                      <Button key={index} onClick={()=>{SlateFun.toggleBlock(editor, format)}} variant={SlateFun.isBlockActive(editor,format,SlateFun.TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')?'outlined':undefined}>
                        <BlockButton formats={format} />
                      </Button>    
                      )             
                    }
                  ):null}
                </div>
                </div>

            {IsShowToolBar('tools','align')||IsShowToolBar('tools','order_list')||IsShowToolBar('tools','list')?
              <div>
                <label>List</label>
                <div>
                {IsShowToolBar('tools','list')||IsShowToolBar('tools','order_list')?

                  SlateFun.LIST_TYPES.filter((item:any)=>
                    (item==='numbered-list' && IsShowToolBar('tools','order_list'))|| (item==='bulleted-list'&&IsShowToolBar('tools','list'))
                  ).map((format:any,index:any)=>{          
                      return (
                      <Button key={index} onClick={()=>{SlateFun.toggleBlock(editor, format)}} variant={SlateFun.isBlockActive(editor,format,SlateFun.TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')?'outlined':undefined}>
                        <BlockButton formats={format} />
                      </Button>    
                      )             
                    }
                  )
                  :null}
                </div>                
              </div>   
              :null
            } 
            {IsShowToolBar('tools','image')?
            <div>
              <label>Insert</label>
              <div>
              <Button onClick={(e)=>{SlateFun.InsertImageButtonFun(e,editor)}}>
                <ImageOutlined />
              </Button>               
              </div>
            </div> 
             :null
            }  
            {  isLinkActive||isButtonActive?
            // SlateFun.isLinkActive(editor)&&!SlateFun.isCollapsed(editor)?
            <div>
              <label>Link style:</label>
              <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small"> 
                    <Select
                      value={linkstyle?linkstyle:'none'}
                      onChange={(e)=>{changeLinkFormat(e.target.value)}}
                      displayEmpty
                      inputProps={{'aria-label': 'Without label' }}
                    >
                      <MenuItem value="none">
                        <em>none</em>
                      </MenuItem>
                      <MenuItem  value="button">
                        botton
                      </MenuItem>
                    </Select>
                  </FormControl>
              </div>
            </div> 
            :null}
            {}
            {  (isLinkActive&&linkstyle==='button')||isButtonActive?
            // ((SlateFun.isLinkActive(editor)&&linkstyle=='button')||SlateFun.isButtonActive(editor))&&!SlateFun.isCollapsed(editor)?
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
            <SlateFun.HoveringToolbar config={config?config.hover_toolbar:null}/>
            <Editable
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                placeholder="Enter some plain text..." 
                onMouseUp={(event:any)=>{
                  setFamilytype(SlateFun.getFormat(editor,'fontFamily'))
                  setSize(SlateFun.getFormat(editor,'fontSize'))
                  setColor(SlateFun.getFormat(editor,'color'))
                  setLinkstyle('none')
                  setIsLinkActive(SlateFun.isLinkActive(editor)?true:false)
                  setIsButtonActive(SlateFun.isButtonActive(editor)?true:false)
                  setIsCollapsed(SlateFun.isCollapsed(editor))

                  if(SlateFun.isButtonActive(editor)){
                    let button:any=SlateFun.getbuttonSetting(editor)
                    let newButton:any=JSON.parse(JSON.stringify(button))
                    if(!newButton.hasOwnProperty('setting')){
                      let setting:any={
                        size:'small',
                        variant:'contained'
                      }
                      newButton.setting=setting
                    }
                      setLinkstyle('button')
                      setButtonVariant(newButton.setting.variant)
                      setButtonSize(newButton.setting.size)
                    
                  }
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
      </div> 
    )

    // return <div>
    //         <BlockProperty title={'Text'} active={props.active}>
    //             <div>
    //                 <label>Font size:</label>
    //                 <Input type='text' defaultValue={size} onChange={(e)=>setSize(parseFloat(e.target.value))} />
    //             </div>  
    //             <div>
    //             <label>Align:</label>
    //             <div>
    //                 <Button onClick={()=>setAlign('left')} variant={(align==='left'||align==undefined)?'outlined':undefined}><FormatAlignLeft /></Button>
    //                 <Button onClick={()=>setAlign('center')} variant={align==='center'?'outlined':undefined}><FormatAlignCenter /></Button>
    //                 <Button onClick={()=>setAlign('right')} variant={align==='right'?'outlined':undefined}><FormatAlignRight /></Button>
    //             </div>
    //             </div>            
    //         </BlockProperty>
    //         <div style={{fontSize: size+'em', textAlign:align}} dangerouslySetInnerHTML={{__html:props.data.content?props.data.content:'default text1111'}} />
    //         </div>
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
    def: (props:{data:any, active:boolean, onSave:(data:any)=>void})=><BlockText {...props} />
}