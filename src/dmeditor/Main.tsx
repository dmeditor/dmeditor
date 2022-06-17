import * as React from 'react';
import { useState } from 'react';
import { Block } from './Block';
import './Main.css';
import { Property } from './Property';
import './Init';

export interface DataTable extends Array<Array<string|number>>{};

export interface BlockData{
    type: string
    content: string|DataTable
}


export const Main = (props:any)=>{
    const [blocks, setBlocks] = useState([{type: 'p', content:'Test'}] as Array<BlockData>);
    const [activeBlock, setActiveBlock] = useState(0);


    const getDefaultData = (type: string) =>{
        if(type == 'p'){
            return 'Hello in paragraph'
        }
        if(type == 'table'){
            return [['test table']]
        }
    }

    const addAbove = (type: string)=>{
        if( type ){
            blocks.splice(activeBlock, 0, {type: type, content: getDefaultData(type) as string} );
            setBlocks(blocks);
        }
    }


    const addUnder = (type: string)=>{
        if( type ){
            setBlocks([...blocks, {type: type, content: getDefaultData(type) as DataTable }]);
            setActiveBlock(activeBlock+1);
        }
    }

    const select = (index:number)=>{
        if( index !== activeBlock ){
            setActiveBlock(index);            
        }
    }

    return (<div className='dmeditor-layout'>
        <div className='layout-main'>   
            {blocks.map((block, index)=>
            <Block key={index+activeBlock} addAbove={addAbove} onSelect={()=>select(index)} active={activeBlock==index} addUnder={addUnder} data={block} />
            )}         
        </div>
        <div className='layout-properties'>  
            <Property current={blocks[activeBlock]} />     
        </div>
    </div>);
}