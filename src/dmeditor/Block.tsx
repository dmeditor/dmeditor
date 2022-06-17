import React, { ReactElement, useState } from 'react';
import './Block.css';
import { blockManager } from './BlockManager';
import { Paragraph } from './blocks/Paragraph';
import { Table } from './blocks/Table';
import { BlockData } from './Main';
import { AddBox, AddBoxOutlined, Collections, CollectionsOutlined, Delete, DeleteOutline, DeleteOutlineOutlined, ImageOutlined, ListAltRounded, MoreHorizOutlined, PlusOneOutlined, PlusOneRounded, TextSnippet, TextSnippetOutlined, TextSnippetRounded } from '@mui/icons-material';

export const Block = (props:{addAbove:any, onSelect:any, addMore:any, onChange:any, onDelete:any, addUnder:any, active:boolean, data: BlockData})=>{
    const [isActive, setIsActive] = useState(props.active);
    const [data, setData] = useState(props.data);
    

    React.useEffect(() => {
        setIsActive(props.active);   
        setData(props.data);    
      });


    const content = data.content;

    const renderContent = (type: string):ReactElement=>{        
        const render = blockManager.getBlock(type);
        if( render ){
            return render(content);
        }else{
            return <div>Unknown block type.</div>
        }
    }

    const onChange = (e:any) =>{
        props.onChange(e.target.innerText);
    }

    const renderBlock = ()=>{
        //{...{contentEditable:isActive?true:false}}
        return <div onClick={props.onSelect} onInput={onChange} className={"block"+(isActive?' block-active':'')} {...{contentEditable:isActive?true:false}}>
            {renderContent(props.data.type)}          
        </div>
    }

    return (<>
        {isActive&&<div className='block-container'>
            <div className="tool tool-above">              
                <a className="tool-item" href="javascript:void(0);" title="Add paragraph" onClick={()=>props.addAbove('p')}><TextSnippetOutlined /></a>
                <a className="tool-item" href="javascript:void(0);" title="Add under" onClick={()=>props.addMore(-1)}><AddBoxOutlined /></a>
            </div>
                {renderBlock()}
            <div className="tool tool-under">                             
                <a className="tool-item" href="javascript:void(0);" title="Add paragraph" onClick={()=>props.addUnder('p')}><TextSnippetOutlined /></a>                
                <a className="tool-item" href="javascript:void(0);" title="Add under" onClick={()=>props.addMore(1)}><AddBoxOutlined /></a>
            </div>
        </div>}
        {!isActive&&<>{renderBlock()}</>}
    </>);
}
