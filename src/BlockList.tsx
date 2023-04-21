import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Block} from "./Block"
import { newBlockData } from "./ToolDefinition";


interface BlockListProps{
    list:Array<any>,
    common?:any,    
    active?:boolean,
    settings?:{
        direction?:'vertical'|'horizontal' //if not set, will be vertical
    },
    allowedType?:string[],
    view?:boolean,
    onChange:(data:any)=>void,
    onActivate?:()=>void
}

export const BlockList = (props:BlockListProps)=>{
    const [activeIndex, setActiveIndex] = useState(props.active?0:-1);
    const [list, setList] = useState(props.list);    
    const listRef = useRef(list); //use ref to avoid data issue when it's debounce change.

    const activate = (index:number)=>{
        setActiveIndex(index);
        if(!props.active && props.onActivate ){
            props.onActivate();
        }
    }

    useEffect(()=>{
        listRef.current = list;
        props.onChange(list);
    }, [list])

    const addUnder = (type:string, template?:string)=>{
        if( type ){
            const defaultData = newBlockData(type, template)                     
            let allBlocks = [...list];                        
            allBlocks.splice(activeIndex+1, 0, defaultData);
            setList( allBlocks );
            setActiveIndex(activeIndex+1);
        }
    }

    const onDelete = (index:number)=>{
        let blocks = [...list];
        blocks.splice(activeIndex, 1);         
        setList(blocks);  
        {
          if(activeIndex===0){
            setActiveIndex(0);
          }else{
            setActiveIndex(activeIndex-1);
          }
        }
    }

    return <div className={'blocklist'}>
        {list.map( (childData, index)=>
            {
              return <div key={childData.id}>
                    {props.view&&<Block
                      data={childData} active={false} 
                      onCancel={()=>{}}
                      onActivate={()=>{}} 
                      onChange={()=>{}}
                      onAddAbove={()=>{}} 
                      onAddUnder={()=>{}} 
                      view={true}
                      />  }
                      {!props.view&&<Block addedType={props.allowedType} onDelete={()=>onDelete(index)} 
                        onAddUnder={addUnder} 
                        siblingDirection={'vertical'} inBlock={true} 
                        active={(props.active&&activeIndex==index)?true:false}
                        onChange={(newData)=>{
                          let newList = [...listRef.current];
                          newList[index] = newData;
                          setList(newList);
                        }} onActivate={()=>activate(index)} data={childData}
                        />
                      }
                  </div>;
            }
        )}
    </div>
}