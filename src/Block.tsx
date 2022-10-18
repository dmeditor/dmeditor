import { useEffect, useRef, useState } from "react"
import { BlockButton } from "./blocks/BlockButton"
import { BlockImage } from "./blocks/BlockImage"
import { BlockText } from "./blocks/BlockText"
import { Table } from "./blocks/Table"

export type BlockInfo = {
    type: string
    content?: any,
    settings?: any,
}

interface BlockProps{
    data: BlockInfo,
    active?:boolean,
    onActiveChange?: (active:boolean)=>void
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
        if(props.data.type=='text'){
            return <BlockText data={props.data} active={isActive} />
        }else if(props.data.type=='image'){
            return <BlockImage data={props.data} active={isActive} />
        }else if(props.data.type=='button'){
            return <BlockButton data={props.data} active={isActive} />      
        }else if(props.data.type=='table'){
            return <Table data={props.data} active={isActive} />
        }else{
            return 'Unknown type';
        }
    };

    
    return <div ref={ref} className={"block block-type-"+props.data.type+(isActive?' active':'')} 
    onClick={(e:any)=>{changeActive(true);}}>
        {render()}       
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
    return <Block data={{type:props.type}} onActiveChange={props.onActiveChange} />
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