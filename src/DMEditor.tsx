import { useState } from 'react';
import { Block } from './Block';
import './DMEditor.css';
import { Property } from './Property';
import './Init';
import { MenuList } from './MenuList';
import { blockManager } from './BlockManager';
import { AddBoxOutlined, HelpOutlined, LaptopMacOutlined, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { BlockInfo } from './types';
import { createTheme, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getDef } from './ToolDefinition';

export const DMEditor = (props:{data:Array<any>})=>{
    const [blocks, setBlocks] = useState(props.data);
    const [activeBlock, setActiveBlock] = useState(-1);
    const [addMore, setAddMore] = useState(1);   
    const [mode, setMode] = useState('add' as 'add'|'select');
    const [propertyParams, setPropertyParams] = useState('');
    const [viewmode, setViewmode] = useState('pc');

    const addAbove = (type: string)=>{
        if( type ){
            let allBlocks = [...blocks];
            const defaultData = blockManager.getBlockType(type).getDefaultData();
            allBlocks.splice(activeBlock, 0, {type: type, content: defaultData} );
            setBlocks(allBlocks);
        }
        setMode('add');
        setAddMore(0);
    }


    const addUnder = (type: string)=>{
        if( type ){
            const defaultData = getDef(type).initData;
            let allBlocks = [...blocks];            
            allBlocks.splice(activeBlock+1, 0, {type: type, content: defaultData });
            setBlocks( allBlocks );
            setActiveBlock(activeBlock+1);
        }
        setMode('add');
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
        setMode('add');
        setAddMore(position);
    }

    const confirmAddMore = (type: string)=>{
        if( addMore > 0 ){
            addUnder( type );
        }else if(addMore < 0){
            addAbove(type);
        }
        setMode('select');
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

    const outerTheme= createTheme({
        palette:{
          primary:grey,
        },
        components:{
          MuiButtonBase:{
            defaultProps:{
              disableRipple:true,        
            }
          }
        }
      });

    return (
        <ThemeProvider theme={outerTheme}>
            <div className='dmeditor-layout'>
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
        <div id="dmeditor-main" className='layout-main-container'>               
         <div className={'layout-main '+' viewmode-'+viewmode}>
            <div style={{width: '100%', height: 1}}></div>
            {blocks.map((block, index)=>{
             const a = ()=>{
                let currentSelected = activeBlock===index ;
                return <div onClick={()=>{setActiveBlock(index); if(!currentSelected){ setMode('select')}}}>
                 {currentSelected && <div className="tool tool-above">                             
                    <a className="tool-item" href="javascript:void(0);" title="Add above" onClick={()=>onAddMore(-1)}><AddBoxOutlined /></a>
                </div>}   
                    <Block data={block} active={currentSelected} />
                 {currentSelected&&<div className="tool tool-under">                             
                    <a className="tool-item" href="javascript:void(0);" title="Add under" onClick={()=>onAddMore(1)}><AddBoxOutlined /></a>
                </div>}
                </div>;         
             }
             return a();        
            }
                // <Block key={index+block.type} onUpdateProperty={updatePropertyParams} addAbove={addAbove} addMore={onAddMore} onDelete={onDelete} onSelect={()=>select(index)} onChange={onChange} active={activeBlock==index} addUnder={addUnder} data={block} />
                
                // <Block data={block} />
            )}  
         </div>                    
        </div>
        <div className='layout-properties'>
            {mode==='add'&&<MenuList onSelect={confirmAddMore} />}
            {/* {(addMore==0&&activeBlock>=0)&&<div id="dmeditor-property"></div> } */}
            <div id="dmeditor-property" style={{display: mode==='select'?'block':'none'}}></div>
        </div>
    </div></ThemeProvider>);
}