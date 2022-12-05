import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './DMEditor.css';
import './Init';
import { MenuList } from './MenuList';
import { blockManager } from './BlockManager';
import { AddBoxOutlined, HelpOutlined, LaptopMacOutlined, ModeEditOutline, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { BlockInfo } from './types';
import { createTheme, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getDef } from './ToolDefinition';
import { Util } from './utils/Util';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";

export interface DMEditorProps{
    data:Array<any>, 
    menu?:React.ReactElement, 
    onChangeActive?:(activeBlock:Number)=>void,
    onChange?:(data:Array<any>)=>void,
    imageBrowse?:any,
    linkBrowse?:any,
    customProperty?:any,
    preBlock?:any,
    pageTab?:any,
    toast?:any,
    pageTabActiveIndex?:any
}

export const DMEditor = (props:DMEditorProps)=>{
    Util.BrowseImage = props.imageBrowse
    Util.BrowseLink = props.linkBrowse
    Util.CustomProperty = props.customProperty
    Util.PreBlock = props.preBlock
    Util.pageTab = props.pageTab
    Util.toast=props.toast
    Util.pageTabActiveIndex=props.pageTabActiveIndex||0
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
    useEffect(()=>{
      if( props.onChangeActive){
          props.onChangeActive(activeBlock)
      }
  }, [activeBlock]);

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
          if(activeBlock===0){
            setActiveBlock(0);
          }else{
            setActiveBlock(activeBlock-1);
          }
        }
    }

    const onMove = (type:string)=>{
      let fullBlocks = [...blocks];
      if(type=='up'){
        if(activeBlock==0)return;
        fullBlocks[activeBlock] = fullBlocks.splice(activeBlock-1, 1, fullBlocks[activeBlock])[0]
        setActiveBlock(activeBlock-1);
      }
      if(type=='down'){
        if(activeBlock==fullBlocks.length-1)return;
        fullBlocks[activeBlock] = fullBlocks.splice(activeBlock+1, 1, fullBlocks[activeBlock])[0]
        setActiveBlock(activeBlock+1);
      }
      setBlocks(fullBlocks);
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
            {viewmode==='edit'&&<>
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
                    onChange={data=>{let newBlocks = [...blocks];newBlocks[index]=data;setBlocks(newBlocks)}}
                    onAddAbove={()=>onAddMore(-1)} 
                    onAddUnder={()=>onAddMore(1)} /></>;         
             }
             return a();        
            }
            )} </>}
            {viewmode!=='edit'&&<DMEditorView data={blocks} />}
         </div>                    
        </div>
        <div className='layout-properties'>
            {mode==='add'&&<MenuList onSelect={confirmAddMore} />}
            {/* {(addMore==0&&activeBlock>=0)&&<div id="dmeditor-property"></div> } */}
            <div id="dmeditor-property" style={{display: mode==='select'?'block':'none'}}>
                {viewmode==='edit'&&mode=='select'&&<div style={{position:"fixed",bottom:0,height:'100px',width: '282px',padding:'10px', backgroundColor:'#ffffff'}}>
                    <div style={{marginBottom:'15px'}} >
                      <a href="/" title="Move up" onClick={(e)=>{e.preventDefault();onMove('up')}}><ArrowUpwardOutlined /> </a> 
                      <a href="/" title="Move down" onClick={(e)=>{e.preventDefault();onMove('down')}}><ArrowDownwardOutlined /></a>
                    </div> 
                    <Button fullWidth variant="contained" color='error' title="Delete" onClick={onDelete}>
                      <DeleteOutline />Delete block
                    </Button>
                </div>} 
            </div>
        </div>
    </div></ThemeProvider>);
}

export const DMEditorView = (props:{data:Array<any>})=>{
    return <div className='dmeditor-view'>
    {props.data.map((block, index)=>{
        const blockElement = ()=>{
           return  <><Block adding={false}
                    data={block} active={false} 
                    onCancel={()=>{}}
                    key={index}
                    onActiveChange={()=>{}} 
                    onChange={()=>{}}
                    onAddAbove={()=>{}} 
                    onAddUnder={()=>{}} 
                    view={true}
                    />                   
                    </>;         
        }
        return blockElement();        
       }
       )}
       </div>
}

/** server side load */
export const serverLoad=async (data:Array<any>)=>{
    let proms:Array<Promise<any>> = [];
    for(let i in data){
        let blockData = data[i];
        let type = blockData.type;
        let def = getDef(type);
        if( def.onServerLoad ){
            proms = [...proms, def.onServerLoad(blockData)];
        }else{
            proms = [...proms, blockData];
        }
    }


    try{
        let newData = await Promise.all(proms)
        return newData;
    }catch(error){
        console.error(error);        
        throw "Failed to fetch data";
    }
}