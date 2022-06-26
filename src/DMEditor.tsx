import { useState } from 'react';
import { Block } from './Block';
import './DMEditor.css';
import { Property } from './Property';
import './Init';
import { MenuList } from './MenuList';
import { blockManager } from './BlockManager';
import { HelpOutlined, LaptopMacOutlined, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { BlockInfo } from './types';

export const DMEditor = (props:{data:Array<BlockInfo>})=>{
    const [blocks, setBlocks] = useState(props.data);
    const [activeBlock, setActiveBlock] = useState(-1);
    const [addMore, setAddMore] = useState(1);   
    const [propertyParams, setPropertyParams] = useState('');
    const [viewmode, setViewmode] = useState('pc');

    const addAbove = (type: string)=>{
        if( type ){
            let allBlocks = [...blocks];
            const defaultData = blockManager.getBlockType(type).getDefaultData();
            allBlocks.splice(activeBlock, 0, {type: type, content: defaultData} );
            setBlocks(allBlocks);
        }
        setAddMore(0);
    }


    const addUnder = (type: string)=>{
        if( type ){
            const defaultData = blockManager.getBlockType(type).getDefaultData();
            let allBlocks = [...blocks];            
            allBlocks.splice(activeBlock+1, 0, {type: type, content: defaultData });
            setBlocks( allBlocks );
            setActiveBlock(activeBlock+1);
        }
        setAddMore(0);
    }

    const select = (index:number)=>{
        if( index !== activeBlock ){
            setActiveBlock(index);            
        }
        setAddMore(0);
    }

    const setting = (content:any)=>{
        let allBlocks = [...blocks];
        allBlocks[activeBlock].content = content;
        setBlocks(allBlocks);
    }

    const onChange = (data:any)=>{
        let allBlocks = [...blocks];
        allBlocks[activeBlock].content=data;
        setBlocks(allBlocks);
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
        let fullBlocks = [...blocks];
        fullBlocks.splice(activeBlock, 1);           
        setBlocks(fullBlocks);
        if( fullBlocks.length===0 ){
            setActiveBlock(-1);
            setAddMore(1);
        }else{
            setActiveBlock(activeBlock-1);
        }
    }

    const updatePropertyParams = (params:any)=>{
        setPropertyParams(params)
    }

    return (<div className='dmeditor-layout'>
        <div className='layout-left'>
            <a target='_blank' title='dmeditor' href="https://github.com/digimakergo/dmeditor"><img src="/logo.png" style={{marginTop:10}} width={28} /></a>            
            <div style={{position:'absolute', bottom:0, width:'100%', textAlign:'center'}}>
            <div className='left-tool'>
                <a href="https://github.com/digimakergo/dmeditor" title='help' target="_blank"><HelpOutlined /></a>
                <hr />
                <a href='javascript:void(0)' className={viewmode=='pc'?'current':''} onClick={()=>setViewmode('pc')} title='PC'><LaptopMacOutlined /></a>
                <a href='javascript:void(0)' className={viewmode=='mobile'?'current':''}  onClick={()=>setViewmode('mobile')} title='Mobile'> <PhoneIphoneOutlined /></a>
                <a href='javascript:void(0)' className={viewmode=='tablet'?'current':''}  onClick={()=>setViewmode('tablet')} title='Tablet'><TabletMacOutlined /></a>
                </div></div>
        </div>  
        <div className='layout-main-container'>               
         <div className={'layout-main '+' viewmode-'+viewmode}>
            <div style={{width: '100%', height: 1}}></div>
            {blocks.map((block, index)=>
                <Block key={index+block.type} onUpdateProperty={updatePropertyParams} addAbove={addAbove} addMore={onAddMore} onDelete={onDelete} onSelect={()=>select(index)} onChange={onChange} active={activeBlock==index} addUnder={addUnder} data={block} />
            )}  
         </div>                    
        </div>
        <div className='layout-properties'>  
            {(addMore!=0||activeBlock==-1)&&<MenuList onSelect={confirmAddMore} />}
            {(addMore==0&&activeBlock>=0)&&<Property params={propertyParams} current={blocks[activeBlock]} onSeting={setting} onDelete={onDelete} />}
        </div>
    </div>);
}