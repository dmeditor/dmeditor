import { AlignHorizontalCenter, AlignHorizontalLeft, AlignHorizontalRight, AlignVerticalCenter, AlignVerticalTop, Collections, CollectionsOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, HorizontalSplit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useState } from "react";
import { Block, BlockInfo } from "./Block"
import { BlockProperty } from "./BlockProperty";
import { getDef } from "./ToolDefinition";


interface BlockListProps{
    list:Array<any>,
    common?:any,    
    active?:boolean,
    settings?:{
        direction?:'vertical'|'horizontal' //if not set, will be vertical
    },
    allowedType?:string[],
    onChange:(data:any)=>void,
    onActivate?:()=>void
}

export const BlockList = (props:BlockListProps)=>{
    const [activeIndex, setActiveIndex] = useState(props.active?0:-1);
    const [list, setList] = useState(props.list);    

    const activate = (index:number)=>{
        setActiveIndex(index);
        if(!props.active && props.onActivate ){
            props.onActivate();
        }
    }

    useEffect(()=>{
        props.onChange(list);
    }, [list])

    const addUnder = (type:string, template?:string)=>{
        if( type ){
            //todo: optimize this to clone or initData()
            var defaultData;
            const def = getDef(type);
            if( template ){
              if( def.templates && def.templates[template] ){
                defaultData = JSON.parse( JSON.stringify( def.templates[template].initData ) );
                defaultData.template = template;
              }else{
                throw "template "+template+ " not found";
              }
            }else{
              defaultData = JSON.parse( JSON.stringify( def.initData ) );
            }
            
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
                // if( child.hasOwnProperty('children') ){
                //     return <Container data={child as BlockContainerType} />;
                // }else{
                    return <div key={childData.id}>
                             <Block addedType={props.allowedType} onDelete={()=>onDelete(index)} 
                             onAddUnder={addUnder} 
                             siblingDirection={'vertical'} inBlock={true} 
                             active={(props.active&&activeIndex==index)?true:false}
                              onChange={(newData)=>{
                                let newList = [...list];
                                newList[index] = newData;
                                setList(newList);
                             }} onActivate={()=>activate(index)} data={childData} />
                       </div>;
                // }
            }
        )}
    </div>
}