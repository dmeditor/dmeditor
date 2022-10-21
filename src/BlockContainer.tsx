import { AlignHorizontalCenter, AlignHorizontalLeft, AlignHorizontalRight, AlignVerticalCenter, AlignVerticalTop, Collections, CollectionsOutlined, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, HorizontalSplit } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Block, BlockInfo } from "./Block"
import { BlockProperty } from "./BlockProperty";


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
                             <Block onSave={(data)=>{}} data={child as BlockInfo} onActiveChange={()=>{}}/>
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
        <BlockProperty active={isActive} title='Container'>
            <div>
                <label>Align:</label>
                <div>
                    <Button onClick={()=>setAlign('left')} variant={(align==='left'||align==undefined)?'outlined':undefined}><FormatAlignLeft /></Button>
                    <Button onClick={()=>setAlign('center')} variant={align==='center'?'outlined':undefined}><FormatAlignCenter /></Button>
                    <Button onClick={()=>setAlign('right')} variant={align==='right'?'outlined':undefined}><FormatAlignRight /></Button>
                </div>
            </div>        
            <div>
            <label>Direction:</label>
            <div>
               <Button onClick={()=>setHorizontal(false)} variant={horizontal?undefined:'outlined'}><AlignHorizontalLeft /></Button>
               <Button onClick={()=>setHorizontal(true)} variant={horizontal?"outlined":undefined}><AlignVerticalTop /></Button>
            </div>
        </div>
        </BlockProperty>
        {renderChildren()}
    </div>;
}