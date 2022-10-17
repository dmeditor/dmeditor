import { AlignHorizontalCenter, AlignHorizontalLeft, AlignHorizontalRight, AlignVerticalCenter, AlignVerticalTop, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, HorizontalSplit } from "@mui/icons-material";
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
                             <Block data={child as BlockInfo} onActiveChange={()=>{}}/>
                       </div>;
                }
            }
        )}
    </div>
}



export type BlockContainerDefinition = {
    allowedType: Array<string>,
    
}


const DefContainer = (props:{ required?:boolean,
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

const DefBlock = (props:{required:boolean, type:string, 
    min?:number, 
    allowedSettings?: string[],
    onActiveChange?:(active:boolean)=>void,
    active?:boolean,
    max?:number})=>{
    return <Block data={{type:props.type}} onActiveChange={props.onActiveChange} />
}

//block: type, required, max, min, containerProperties
//container: allowedType, 
//common: activatedOnSelect(boolean)

//next: trigger

const defTextImage = {
    type: 'imagetext',
    isComposited: true,
    initData: [{type: 'image', content:'http://www.googl.com/logo.png'}],
    def: ()=><DefContainer type='imagetext' horizontal allowedType={["image", "container"]}>
        <DefBlock type="image" required={true} allowedSettings={['leftright']} />
        <DefContainer required={true} allowedType={["text", "container"]}>
            <DefBlock required={true} type="text" />
            <DefContainer align='center' allowedType="button">
                <DefBlock type="button" required={true} max={3} min={1} />
            </DefContainer>
        </DefContainer>
    </DefContainer>
}

const defText = {
    type: 'text',
    isComposited: false,
    initData: 'test',
    def: ()=><Block data={{type:'text'}} onActiveChange={()=>{}}/>
}

export const getDef = (type:string)=>{
    if(type === 'imagetext'){
        return defTextImage;
    }
    return defText
}