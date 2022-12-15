import { AlignHorizontalCenter, AlignHorizontalLeft, AlignHorizontalRight, AlignVerticalCenter, AlignVerticalTop, Collections, CollectionsOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, HorizontalSplit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { nanoid } from "nanoid";
import React from "react";
import { useState } from "react";
import { Block, BlockInfo } from "./Block"
import { BlockProperty } from "./BlockProperty";
import { getDef } from "./ToolDefinition";


interface BlockListProps{
    data:Array<any>,
    common?:any,    
    active?:boolean,
    settings?:{
        direction?:'vertical'|'horizontal' //if not set, will be vertical
    },
    allowedType?:string[],
    onActivate?:()=>void
}

export const BlockList = (props:BlockListProps)=>{
    const [activeIndex, setActiveIndex] = useState(props.active?0:-1);
    const [data, setData] = useState(props.data);    

    const activate = (index:number)=>{
        setActiveIndex(index);
        if(!props.active && props.onActivate ){
            props.onActivate();
        }
    }

    const addUnder = (type:string)=>{
        if( type ){
            //todo: optimize this to clone or initData()
            const defaultData = JSON.parse( JSON.stringify(getDef(type).initData) );
            defaultData.id = nanoid();
            let allBlocks = [...data];                        
            allBlocks.splice(activeIndex+1, 0, defaultData);
            setData( allBlocks );
            setActiveIndex(activeIndex+1);
        }
    }

    return <div className={'blocklist'}>
        {data.map( (childData, index)=>
            {
                // if( child.hasOwnProperty('children') ){
                //     return <Container data={child as BlockContainerType} />;
                // }else{
                    return <div key={childData.id}>
                             <Block addedType={props.allowedType} onAddUnder={addUnder} siblingDirection={'vertical'} inBlock={true} active={(props.active&&activeIndex==index)?true:false} onChange={(data)=>{}} onActivate={()=>activate(index)} data={childData} />
                       </div>;
                // }
            }
        )}
    </div>
}