import { AddBoxOutlined } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { getDef } from "./ToolDefinition"

export type BlockInfo = {
    type: string
    content?: any,
    settings?: any,
}

interface BlockProps{
    data: any,
    active?:boolean,
    onActiveChange?: (active:boolean)=>void,
    onAddAbove?:any,
    onAddUnder?:any
}

export const Block = (props:BlockProps)=>{
    const [isActive, setIsActive] = useState(props.active?true:false);
    const ref:any = useRef();
    useOnClickOutside(ref, () => changeActive(false));

    const changeActive = (active:boolean)=>{
        setIsActive(active);
        if( props.onActiveChange ){
            props.onActiveChange(active);
        }
    }

    const render = ()=>{
        let def = getDef( props.data.type );
        if( def){
            let ToolRender = def.def;
            return <ToolRender data={props.data} active={isActive} />
        }else{
            return 'Unknown type:'+props.data.type;
        }
    };

    
    return <div ref={ref} className={'block-container'+(isActive?' active':'')} onClick={(e:any)=>changeActive(true)}>
            {isActive&&<div className="tool tool-above">                             
                            <a className="tool-item" href="javascript:void(0);" title="Add above" onClick={()=>props.onAddAbove()}>
                                <AddBoxOutlined /></a>
                        </div>}            
        <div className={"block block-type-"+props.data.type}>
        {render()}  
        </div>   
    {isActive&&<div className="tool tool-under">                             
                <a className="tool-item" href="javascript:void(0);" title="Add under" onClick={()=>props.onAddUnder()}><AddBoxOutlined /></a>
            </div>}  
    </div>

}

//block: type, required, max, min, containerProperties
//container: allowedType, 
//common: activatedOnSelect(boolean)

//next: trigger
export const DefBlock = (props:{required:boolean, type:string, 
    min?:number, 
    allowedSettings?: string[],
    onActiveChange?:(active:boolean)=>void,
    active?:boolean,
    max?:number})=>{
    let defaultData = getDef(props.type).initData;
    return <Block data={defaultData} onActiveChange={props.onActiveChange} />
}


const useOnClickOutside = (ref:any, handler:any)=> {
    useEffect(
      () => {
        const listener = (event:any) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
  
        document.getElementById('dmeditor-main')?.addEventListener("mousedown", listener);
        document.getElementById('dmeditor-main')?.addEventListener("touchstart", listener);
  
        return () => {
          document.getElementById('dmeditor-main')?.removeEventListener("mousedown", listener);
          document.getElementById('dmeditor-main')?.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
}