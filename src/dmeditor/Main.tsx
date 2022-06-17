import * as React from 'react';
import { useState } from 'react';
import { Block } from './Block';
import './Main.css';
import { Property } from './Property';
import './Init';
import { MoreBlocks } from './MoreBlocks';

export interface DataTable extends Array<Array<string|number>>{};

export interface DataFullImage{
    src: string,
    style: {
        padding: number,
        borderWidth: number,
        background: string
    }
}


export interface BlockData{
    type: string
    content: string|DataTable|DataFullImage
}


export const Main = (props:any)=>{
    const [blocks, setBlocks] = useState([{type: 'p', content:'Test'}] as Array<BlockData>);
    const [activeBlock, setActiveBlock] = useState(0);
    const [addMore, setAddMore] = useState(0);
    

    const getDefaultData = (type: string) =>{
        if(type == 'p'){
            return 'Hello in paragraph'
        }
        if(type == 'table'){
            return [['test table', 'test table1']]
        }
        if(type == 'full_image'){
            let v:DataFullImage = {
                src:'https://www.iucn.org/sites/dev/files/content/images/2020/shutterstock_1458128810.jpg',
                style: {padding: 2, borderWidth: 0, background:''}
            };

            return v;
        }

    }

    const addAbove = (type: string)=>{
        if( type ){
            let allBlocks = [...blocks];
            allBlocks.splice(activeBlock, 0, {type: type, content: getDefaultData(type) as string} );
            setBlocks(allBlocks);
        }
        setAddMore(0);
    }


    const addUnder = (type: string)=>{
        if( type ){
            setBlocks([...blocks, {type: type, content: getDefaultData(type) as DataTable }]);
            setActiveBlock(activeBlock+1);
        }
        setAddMore(0);
    }

    const select = (index:number)=>{
        if( index !== activeBlock ){
            setActiveBlock(index);            
        }
    }

    const setting = (content:any)=>{
        let allBlocks = [...blocks];
        allBlocks[activeBlock].content = content;
        setBlocks(allBlocks);
    }

    const onChange = (data:any)=>{
        let allBlocks = [...blocks];
        if( allBlocks[activeBlock].type == 'p' ){
            // allBlocks[activeBlock].content = data;
            // setBlocks(allBlocks);
        }
    }

    const onAddMore = (position:number)=>{
        setAddMore(position);
    }

    const confirmAddMore = (type: string)=>{
        if( addMore > 0 ){
            addUnder( type );
        }else if(addMore < 0){
            addAbove(type);
        }
    }

    const onDelete = ()=>{
        if( activeBlock>0 ){
            let fullBlocks = [...blocks];
            fullBlocks.splice(activeBlock, 1);
            if( activeBlock == blocks.length -1 ){
                setActiveBlock(blocks.length-2);
            }
            setBlocks(fullBlocks);
        }
    }

    return (<div className='dmeditor-layout'>
        <div className='layout-main'>   
            {blocks.map((block, index)=>
                <Block key={index} addAbove={addAbove} addMore={onAddMore} onDelete={onDelete} onSelect={()=>select(index)} onChange={onChange} active={activeBlock==index} addUnder={addUnder} data={block} />
            )}         
        </div>
        <div className='layout-properties'>  
            {addMore!=0&&<MoreBlocks onSelect={confirmAddMore} />}
            {addMore==0&&<Property current={blocks[activeBlock]} onSeting={setting} onDelete={onDelete} />}
        </div>
    </div>);
}