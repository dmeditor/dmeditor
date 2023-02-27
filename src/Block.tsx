import { AddBoxOutlined, CancelOutlined, DeleteOutline } from "@mui/icons-material"
import React from "react"
import { useEffect, useRef, useState,useCallback} from "react"
import { getDef } from "./ToolDefinition"
import { Util } from './utils/Util';
import _debounce from 'lodash/debounce'
import ReactDOM from "react-dom";
import { MenuList } from "./MenuList";
import { Button } from "@mui/material";
import { BlockProperty } from "./BlockProperty";
import { PropertyButton } from "./utils";
import { css } from "@emotion/css";

export type BlockInfo = {
    type: string
    content?: any,
    settings?: any,
}

interface BlockProps{
    data: any,
    active?:boolean,
    onActivate?: ()=>void,
    onAddAbove?:(type:string, template?:string)=>void,
    onAddUnder?:(type:string, template?:string)=>void,
    onChange:(data:any)=>void,
    onCancel?:()=>void,
    view?:boolean,
    inBlock?:boolean,
    newBlock?:boolean,
    addedType?:string[],
    //undefined means can not have sibling
    siblingDirection?:'vertical'|'horizontal',
    onDelete?:()=>void
}

export const Block = React.memo((props:BlockProps)=>{
    const [isActive, setIsActive] = useState(props.active?true:false);
    const [selectingTool, setSelectingTool] = useState(false);
    const [addUnder, setAddUnder] = useState(0);  

    //update is active from props
    useEffect(()=>{
      setIsActive(props.active?true:false);      
    }, [props.active]);


    useEffect(()=>{
      if( !isActive ){
          setSelectingTool(false);
      }
    }, [isActive])

    const activeBlock = ()=>{
      if(!isActive){
        setIsActive(true);
        if(props.onActivate){
          props.onActivate();
        }
      }
    }

    const onDataChange = (data:any,debounce?:boolean) =>{ 
      if(debounce){
        debounceSave(data) 
      }else{
        props.onChange(data);
      }
    }
    const debounceSave = useCallback(_debounce((data:any)=>{
      props.onChange(data);
    }, 500), []);

    const startAdd = (under:number)=>{
      setSelectingTool(true);
      setAddUnder(under);
    }

    const addBlock = (type:string, template?:string)=>{
      if( addUnder > 0 && props.onAddUnder ){
        props.onAddUnder(type, template);
      }

      if( addUnder < 0 && props.onAddAbove ){
        props.onAddAbove(type, template);
      }
      setSelectingTool(false);
    }

    const render = ()=>{
        let def = getDef( props.data.type );
        let templateCss = '';
        if( props.data.template && def.templates ){
          const templateDef = def.templates[props.data.template];
          if( templateDef.css ){
             templateCss = css(templateDef.css);
          }
        }
        if( def){           
            return <div className={"dmeditor-block block-type-"+props.data.type+(props.data.template?' dmeditor-template-'+props.data.type+'-'+props.data.template:'')+' '+templateCss}  onClick={(e:any)=>activeBlock()}>
              {props.view && <def.view data={props.data} />}
              {!props.view&&<def.render adding={props.newBlock} inBlock={props.inBlock?true:false} onChange={(data:any,debounce?:boolean)=>{onDataChange(data,debounce)}} data={props.data} active={isActive} onCancel={props.onCancel} />}
            </div>
        }else{
            return 'Unknown type:'+props.data.type;
        }
    };

    return <div className={'block-container'+(isActive?' active':'')+(props.inBlock?' inblock':'')} id={props.data.id}>
            {selectingTool&&<RenderMenu onAdd={addBlock} onCancel={()=>setSelectingTool(false)} allowedType ={props.addedType} />}
            {!props.view&&props.siblingDirection==='vertical'&&<div className="tool tool-above">
                            <a className="tool-item" href="/" title="Add above" onClick={(e)=>{e.preventDefault();e.stopPropagation();startAdd(-1)}}>
                                <AddBoxOutlined /></a>
                        </div>}   
                        <div className={"pre-render"}>
                          {Util.renderPreBlock({blockData:props.data.dm_field?props.data.dm_field:''})}
                          </div>         
        {isActive&&props.onDelete&&<BlockProperty blocktype={props.data.type}>
          <div style={{float: 'right'}}>
            <PropertyButton color="warning" title="Delete" onClick={()=>{if(props.onDelete)props.onDelete()}}><DeleteOutline /></PropertyButton>
          </div>
          </BlockProperty>}
        {render()}  
    {!props.view&&props.siblingDirection==='vertical'&&<div className="tool tool-under">
                <a className="tool-item" href="/" title="Add under" onClick={(e)=>{e.preventDefault();e.stopPropagation();startAdd(1)}}><AddBoxOutlined /></a>
            </div>}  
    </div>

});

export const RenderMenu=(props:{onAdd:(type:string, template?:string)=>void, onCancel:()=>void, allowedType?:string[]})=>{
  const menuRoot = document.getElementById('dmeditor-add-menu');

  return menuRoot?ReactDOM.createPortal(
        <div>
          <div style={{float:'right', marginRight:'5px'}}>
            <Button onClick={props.onCancel}><CancelOutlined /></Button>
          </div>
          <MenuList allowedType={props.allowedType} onSelect={(type:string, template?:string)=>{if(props.onAdd){
            props.onAdd(type, template);
            }}} />          
        </div>          
      ,
      menuRoot as HTMLElement
    ):<></>
}