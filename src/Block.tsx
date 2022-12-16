import { AddBoxOutlined, CancelOutlined } from "@mui/icons-material"
import React from "react"
import { useEffect, useRef, useState,useCallback} from "react"
import { getDef } from "./ToolDefinition"
import { Util } from './utils/Util';
import _debounce from 'lodash/debounce'
import ReactDOM from "react-dom";
import { MenuList } from "./MenuList";
import { Button } from "@mui/material";

export type BlockInfo = {
    type: string
    content?: any,
    settings?: any,
}

interface BlockProps{
    data: any,
    active?:boolean,
    onActivate?: ()=>void,
    onAddAbove?:(type:string)=>void,
    onAddUnder?:(type:string)=>void,
    onChange:(data:any)=>void,
    onCancel?:()=>void,
    view?:boolean,
    inBlock?:boolean,
    newBlock?:boolean,
    addedType?:string[],
    //undefined means can not have sibling
    siblingDirection?:'vertical'|'horizontal',
}

export const Block = React.memo((props:BlockProps)=>{
    const [isActive, setIsActive] = useState(props.active?true:false);
    const [adding, setAdding] = useState(false);
    const [addUnder, setAddUnder] = useState(0);  

    //update is active from props
    useEffect(()=>{
      setIsActive(props.active?true:false);      
    }, [props.active]);


    useEffect(()=>{
      if( !isActive ){
          setAdding(false);
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
      setAdding(true);
      setAddUnder(under);
    }

    const addBlock = (type:string)=>{
      if( addUnder > 0 && props.onAddUnder ){
        props.onAddUnder(type);
      }

      if( addUnder < 0 && props.onAddAbove ){
        props.onAddAbove(type);
      }
      setAdding(false);
    }

    const render = ()=>{
        let def = getDef( props.data.type );
        if( def){
            if(props.view){
                let ViewRender = def.view;                
                return <ViewRender data={props.data} />
            }else{
                let ToolRender = def.render;
                return <ToolRender adding={props.newBlock} inBlock={props.inBlock?true:false} onChange={(data:any,debounce?:boolean)=>{onDataChange(data,debounce)}} data={props.data} active={isActive} onCancel={props.onCancel} />
            }
        }else{
            return 'Unknown type:'+props.data.type;
        }
    };

    return <div className={'block-container'+(isActive?' active':'')+(props.inBlock?' inblock':'')}>
            {adding&&<RenderMenu onAdd={addBlock} onCancel={()=>setAdding(false)} allowedType ={props.addedType} />}
            {props.siblingDirection==='vertical'&&<div className="tool tool-above">
                            <a className="tool-item" href="/" title="Add above" onClick={(e)=>{e.preventDefault();e.stopPropagation();startAdd(-1)}}>
                                <AddBoxOutlined /></a>
                        </div>}   
                        <div className={"pre-render"}>
                          {Util.renderPreBlock({blockData:props.data.dm_field?props.data.dm_field:''})}
                          </div>         
        <div className={"block block-type-"+props.data.type}  onClick={(e:any)=>activeBlock()}>
        {render()}  
        </div>   
    {props.siblingDirection==='vertical'&&<div className="tool tool-under">
                <a className="tool-item" href="/" title="Add under" onClick={(e)=>{e.preventDefault();e.stopPropagation();startAdd(1)}}><AddBoxOutlined /></a>
            </div>}  
    </div>

});

export const RenderMenu=(props:{onAdd:(type:string)=>void, onCancel:()=>void, allowedType?:string[]})=>{
  const menuRoot = document.getElementById('dmeditor-add-menu');

  return menuRoot?ReactDOM.createPortal(
        <div>
          <div style={{float:'right', marginRight:'5px'}}>
            <Button onClick={props.onCancel}><CancelOutlined /></Button>
          </div>
          <MenuList allowedType={props.allowedType} onSelect={(type:string)=>{if(props.onAdd){
            props.onAdd(type);
            }}} />          
        </div>          
      ,
      menuRoot as HTMLElement
    ):<></>
}