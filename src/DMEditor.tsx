import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './DMEditor.css';
import { Property } from './Property';
import './Init';
import { MenuList } from './MenuList';
import { blockManager } from './BlockManager';
import { AddBoxOutlined, HelpOutlined, LaptopMacOutlined, ModeEditOutline, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { BlockInfo } from './types';
import { createTheme, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getDef } from './ToolDefinition';
import { Util } from './utils/Util';

export interface DMEditorProps{
    data:Array<any>, 
    menu?:React.ReactElement, 
    onChange?:(data:Array<any>)=>void,
    imageBrowse?:any,
    linkBrowse?:any
}

export const DMEditor = (props:DMEditorProps)=>{
    Util.BrowseImage = props.imageBrowse
    Util.BrowseLink = props.linkBrowse
    const [blocks, setBlocks] = useState(props.data);
    const [activeBlock, setActiveBlock] = useState(-1);
    const [addMore, setAddMore] = useState(1);   
    const [mode, setMode] = useState('add' as 'add'|'select');
    const [propertyParams, setPropertyParams] = useState('');
    const [viewmode, setViewmode] = useState('edit');
    const [addingBlock, setAddingBlock] = useState(-1);

    const addAbove = (type: string)=>{
        if( type ){
            //todo: optimize this to clone or initData()
            const defaultData = JSON.parse( JSON.stringify( getDef(type).initData ) );
            let allBlocks = [...blocks];
            allBlocks.splice(activeBlock, 0, defaultData );
            setBlocks(allBlocks);
        }
        setMode('add');
        setAddMore(0);
    }

    useEffect(()=>{
        if( props.onChange){
            props.onChange(blocks)
        }
    }, [blocks]);

    const addUnder = (type: string)=>{
        if( type ){
            //todo: optimize this to clone or initData()
            const defaultData = JSON.parse( JSON.stringify(getDef(type).initData) );
            let allBlocks = [...blocks];                        
            allBlocks.splice(activeBlock+1, 0, defaultData);
            setBlocks( allBlocks );
            setActiveBlock(activeBlock+1);
            setAddingBlock(activeBlock+1);
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
            },
            styleOverrides: {
                root: {
                '&.MuiButton-root': {
                  minWidth: '30px',
                  padding: '5px'
                }},
              },
          }
        }
      });

    return (
        <ThemeProvider theme={outerTheme}>
            <div className='dmeditor dmeditor-layout'>
        <div className='layout-left'>
            {props.menu?props.menu:<a target='_blank' title='dmeditor' href="https://github.com/digimakergo/dmeditor"><img src="/logo.png" style={{marginTop:10}} width={28} /></a>}
            <div style={{position:'absolute', bottom:0, width:'100%', textAlign:'center'}}>
            <div className='left-tool'>
                <a href="https://github.com/digimakergo/dmeditor" title='help' target="_blank"><HelpOutlined /></a>
                <hr />
                <a href='/' className={viewmode=='edit'?'current':''} onClick={(e)=>{e.preventDefault();setViewmode('edit')}} title='Edit'><ModeEditOutline /></a>
                <a href='/' className={viewmode=='pc'?'current':''} onClick={(e)=>{e.preventDefault();setViewmode('pc')}} title='PC'><LaptopMacOutlined /></a>
                <a href='/' className={viewmode=='mobile'?'current':''}  onClick={(e)=>{e.preventDefault();setViewmode('mobile')}} title='Mobile'> <PhoneIphoneOutlined /></a>
                <a href='/' className={viewmode=='tablet'?'current':''}  onClick={(e)=>{e.preventDefault();setViewmode('tablet')}} title='Tablet'><TabletMacOutlined /></a>
                </div></div>
        </div>  
        <div id="dmeditor-main" className='layout-main-container'>               
         <div className={'layout-main '+' viewmode-'+viewmode+(viewmode==='edit'?'':' is-preview')}>
            <div style={{width: '100%', height: 1}}></div>
            {blocks.map((block, index)=>{
             const a = ()=>{
                let currentSelected = activeBlock===index ;
                return  <><Block adding={currentSelected&&index===addingBlock}
                         data={block} active={currentSelected} 
                         onCancel={onDelete}
                         key={index}
                         onActiveChange={(active:boolean)=>{
                        if(active){
                            setActiveBlock(index);
                            setAddingBlock(-1);
                            //changed from other's to current
                            if( !currentSelected ){
                                setMode('select');
                            }
                        }
                    }} 
                    onChange={data=>{blocks[index]=data;setBlocks(blocks)}}
                    onAddAbove={()=>onAddMore(-1)} 
                    onAddUnder={()=>onAddMore(1)} /></>;         
             }
             return a();        
            }
            )}  
         </div>                    
        </div>
        <div className='layout-properties'>
            {mode==='add'&&<MenuList onSelect={confirmAddMore} />}
            {/* {(addMore==0&&activeBlock>=0)&&<div id="dmeditor-property"></div> } */}
            <div id="dmeditor-property" style={{display: mode==='select'?'block':'none'}}></div>
            {/* {(addMore==0&&activeBlock>=0)&&<Property params={propertyParams} current={blocks[activeBlock]} onSeting={setting} onDelete={onDelete} />} */}
        </div>
    </div></ThemeProvider>);
}
