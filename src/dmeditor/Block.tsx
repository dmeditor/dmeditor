import React, { ReactElement, useState } from 'react';
import './Block.css';
import { blockManager } from './BlockManager';
import {  BlockInfo } from './Main';
import { AddBoxOutlined, TextSnippetOutlined } from '@mui/icons-material';

export const Block = (props:{addAbove:any, onSelect:any, addMore:any, onChange:any, onDelete:any, addUnder:any, active:boolean, onUpdateProperty:any, data: BlockInfo})=>{
    const [isActive, setIsActive] = useState(props.active);
    const [data, setData] = useState(props.data);
    

    React.useEffect(() => {
        setIsActive(props.active);   
        setData(props.data);    
      });


    const content = data.content;



    const renderContent = (type: string):ReactElement=>{        
        const handler = blockManager.getBlockType(type);
        if( handler ){
            return handler.renderMain(content, isActive, onChange, props.onUpdateProperty);
        }else{
            return <div>Unknown block type.</div>
        }
    }

    const onChange = (data:any) =>{
        props.onChange(data);
    }

    const renderBlock = ()=>{
        return <div onClick={props.onSelect} className={"block"+(isActive?' block-active':'')}>
            {renderContent(props.data.type)}          
        </div>
    }

    return (<>
        {isActive&&<div className='block-container'>
            <div className="tool tool-above">              
                <a className="tool-item" href="javascript:void(0);" title="Add paragraphs" onClick={()=>props.addAbove('p')}><TextSnippetOutlined /></a>
                <a className="tool-item" href="javascript:void(0);" title="Add under" onClick={()=>props.addMore(-1)}><AddBoxOutlined /></a>
            </div>
                {renderBlock()}
            <div className="tool tool-under">                             
                <a className="tool-item" href="javascript:void(0);" title="Add paragraphs" onClick={()=>props.addUnder('p')}><TextSnippetOutlined /></a>                
                <a className="tool-item" href="javascript:void(0);" title="Add under" onClick={()=>props.addMore(1)}><AddBoxOutlined /></a>
            </div>
        </div>}
        {!isActive&&<>{renderBlock()}</>}
    </>);
}

export interface BlockType{
    onSettingUpdate:()=>void,
    onDelete:(index:number)=>void,
    onAdd:()=>any    //when adding a new block    
}