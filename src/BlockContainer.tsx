import { AlignHorizontalCenter, AlignHorizontalLeft, AlignHorizontalRight, AlignVerticalCenter, AlignVerticalTop, Collections, CollectionsOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, HorizontalSplit } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Block, BlockInfo } from "./Block"
import { BlockProperty } from "./BlockProperty";
import { PropertyButton, PropertyItem } from "./utils/Property";


export type BlockContainerType = {
    settings:{ childrenHorizontal?: boolean},
    children: Array<BlockContainerType|BlockInfo>,
    allowedType:Array<string>
} & BlockInfo;

interface BlockContainerProps{
    data:BlockContainerType
}

export const BlockContainer = (props:BlockContainerProps)=>{
    return <div className={'block blockcontainer block-type-'+props.data.type+' '+(props.data.settings.childrenHorizontal?'blockcontainer-horizontal':'')}>
        {props.data.children.map( (child)=>
            {
                if( child.hasOwnProperty('children') ){
                    return <BlockContainer data={child as BlockContainerType} />;
                }else{
                    return <div>
                             <Block onChange={(data)=>{}} data={child as BlockInfo} />
                       </div>;
                }
            }
        )}
    </div>
}



export type BlockContainerDefinition = {
    allowedType: Array<string>,
    
}


export const DefContainer = (props:{ required?:boolean,
                            type?:string,
                            allowedType:string|Array<string>,
                            horizontal?:boolean,
                            align?:'left'|'center'|'right',
                            active?:boolean,
                            onActiveChange?:(changed:boolean)=>void,
                            children:any}
                     )=>{
    const [isActive, setIsActive] = useState(props.active?true:false);
    const [horizontal, setHorizontal] = useState(props.horizontal?true:false);
    const [align, setAlign] = useState(props.align);

    const attachOnActiveChange = (child:any)=>{            
            const newProps = { ...child.props };
            if( !newProps.onActiveChange ){
                newProps.onActiveChange = (changed:boolean)=>{
                    setIsActive(changed)                    
                };                
            }
            const preparedChild = { ...child, props: newProps};
            return preparedChild;
    }

    const renderChildren = ()=>{
        if(props.children.constructor.name === 'Array'){      
            var newChildren = props.children.map((child:any, i:number) => {
                let newChild = attachOnActiveChange(child);
                return newChild;
            });
         return <>{newChildren}</>;
        }else{
            return <>{attachOnActiveChange(props.children)}</>;
        }
    }
       

    return <div className={'block blockcontainer'+(props.type?' block-type-'+props.type:'')+' '+(horizontal?'blockcontainer-horizontal':'')+(align?(' blockcontainer-align-'+align):'')} onClick={()=>setIsActive(true)}>
        {props.active&&<BlockProperty blocktype="">
            <div>
                <PropertyItem label='Align'>
                    <PropertyButton onClick={()=>setAlign('left')} selected={align==='left'||align==undefined}><FormatAlignLeft />
                    </PropertyButton>
                    <PropertyButton onClick={()=>setAlign('center')} selected={align==='center'}><FormatAlignCenter /></PropertyButton>
                    <PropertyButton onClick={()=>setAlign('right')} selected={align==='right'}><FormatAlignRight /></PropertyButton>
                </PropertyItem>
            <PropertyItem label='Direction'>
               <PropertyButton onClick={()=>setHorizontal(false)} selected={!horizontal}><AlignHorizontalLeft /></PropertyButton>
               <PropertyButton onClick={()=>setHorizontal(true)} selected={horizontal}><AlignVerticalTop /></PropertyButton>
            </PropertyItem>
        </div>
        </BlockProperty>}
        {renderChildren()}
    </div>;
}