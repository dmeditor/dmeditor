import React, { useEffect, useState } from 'react';
import { Block, RenderMenu } from './Block';
import './DMEditor.css';
import './templates/templates.css';
import './Init';
import { MenuList } from './MenuList';
import { blockManager } from './BlockManager';
import { AddBoxOutlined, HelpOutlined, LaptopMacOutlined, ModeEditOutline, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getDef, newBlockData } from './ToolDefinition';
import { Util } from './utils/Util';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PropertyTab } from './Tab';
import { nanoid } from 'nanoid';

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
    useEffect(()=>{
        Util.BrowseImage = props.imageBrowse
        Util.BrowseLink = props.linkBrowse
        Util.CustomProperty = props.customProperty
        Util.PreBlock = props.preBlock
        Util.pageTab = props.pageTab
        Util.toast=props.toast
        Util.pageTabActiveIndex=props.pageTabActiveIndex||0
    },[]);
    const [blocks, setBlocks] = useState(props.data?props.data:[]);
    const [activeBlock, setActiveBlock] = useState(blocks.length>0?0:-1);
    const [newBlock, setNewBlock] = useState(false);
    const [viewmode, setViewmode] = useState('edit');

    const addAbove = (type: string, index:number, template?:string)=>{
        if( type ){
            const defaultData = newBlockData(type, template);
            let allBlocks = [...blocks];
            allBlocks.splice(index, 0, defaultData );
            setBlocks(allBlocks);
            setNewBlock(true);
            setActiveBlock(index-1);
        }
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

    const addUnder = (type: string, index:number, template?:string)=>{
        if( type ){
            const defaultData = newBlockData(type, template);       
            let allBlocks = [...blocks];                        
            allBlocks.splice(index+1, 0, defaultData);
            setBlocks( allBlocks );
            setNewBlock(true);
            setActiveBlock(index+1);
        }
    }    

    const onDelete = ()=>{
        let fullBlocks = [...blocks];
        fullBlocks.splice(activeBlock, 1);           
        setBlocks(fullBlocks);
        if( fullBlocks.length===0 ){
            setActiveBlock(-1);
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
                return  <><Block
                         siblingDirection='vertical'
                         data={block} active={currentSelected} 
                         newBlock={currentSelected&&newBlock?true:false}
                         onCancel={onDelete}
                         key={block.id}
                         onActivate={()=>{
                            setActiveBlock(index);      
                            setNewBlock(false)                                          
                    }} 
                    onChange={data=>{
                      let newBlocks = [...blocks];
                      newBlocks[index]=data;
                      setBlocks(newBlocks)
                      setNewBlock(false)
                    }}
                    onAddAbove={(type:string, template?:string)=>addAbove(type, index, template)} 
                    onAddUnder={(type:string, template?:string)=>addUnder(type, index, template)} /></>;         
             }
             return a();        
            }
            )} </>}
            {viewmode!=='edit'&&<DMEditorView data={blocks} />}
         </div>                    
        </div>
        <div className='layout-properties'>
            <div>
            <div id="dmeditor-add-menu">
              {blocks.length===0&&<MenuList onSelect={(type:string, template?:string)=>{addUnder(type, -1, template)}} /> }
            </div>
            <PropertyTab 
                active={0}
                tabs={[
                     {title: blocks[activeBlock]?(getDef(blocks[activeBlock].type).name):'Insert', 
                     element:
                      <div style={{marginBottom:'100px'}}>
                        <div id="dmeditor-property" />

                        {viewmode==='edit'&&<div style={{position:"fixed",bottom:0,height:'100px',width: '282px',padding:'10px', backgroundColor:'#ffffff'}}>
                            <div style={{marginBottom:'15px'}} >
                            <a href="/" title="Move up" onClick={(e)=>{e.preventDefault();onMove('up')}}><ArrowUpwardOutlined /> </a> 
                            <a href="/" title="Move down" onClick={(e)=>{e.preventDefault();onMove('down')}}><ArrowDownwardOutlined /></a>
                            </div> 
                            <Button fullWidth variant="contained" color='error' title="Delete" onClick={onDelete}>
                            <DeleteOutline />Delete block
                            </Button>
                        </div>} 
                      </div>
                   },
                    {title:'Page', element:<div>
                     {Util.renderPageTab()}
                </div>},                             
              ]} />                
            </div>
        </div>
    </div></ThemeProvider>);
}

export const DMEditorView = (props:{data:Array<any>})=>{
    return <div className='dmeditor-view'>
    {props.data.map((block, index)=>{
        const blockElement = ()=>{
           return  <><Block
                    data={block} active={false} 
                    onCancel={()=>{}}
                    key={index}
                    onActivate={()=>{}} 
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