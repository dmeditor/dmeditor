import React, { ReactElement, useState } from 'react';
import './Block.css';
import { blockManager } from './BlockManager';
import { Paragraph } from './blocks/Paragraph';
import { Table } from './blocks/Table';
import { BlockData } from './Main';

export const Block = (props:{addAbove:any, onSelect:any, addUnder:any, active:boolean, data: BlockData})=>{
    const [isActive, setIsActive] = useState(props.active);

    React.useEffect(() => {
        setIsActive(props.active);       
      }, [props.active]);


    const content = props.data.content;

    const renderContent = (type: string):ReactElement=>{        
        const render = blockManager.getBlock(type);
        if( render ){
            return render(content);
        }else{
            return <div>Unknown block type.</div>
        }
    }


    return (<>
        {isActive&&<div className="tool tool-above"><a href="#" title="Add above" onClick={props.addAbove}>+</a></div>}
        <div onClick={props.onSelect} className={"block"+(isActive?' block-active':'')} {...{contentEditable:isActive?true:false}}>
            {renderContent(props.data.type)}          
        </div>
        {isActive&&<div className="tool tool-under"><a href="#" title="Add under" onClick={props.addUnder}>+</a></div>}
    </>);
}
