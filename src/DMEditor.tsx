import React, { useEffect, useRef, useState } from 'react';
import { Block} from './Block';
import {dmeditorEditCss, dmeditorViewCss, setMainWidthCssVariable} from './DMEditor.css';
import './Init';
import { MenuList } from './MenuList';
import { LaptopMacOutlined, Menu, ModeEditOutline, PhoneIphoneOutlined, TabletMacOutlined,MoreHorizOutlined, LinkOutlined, Help, HelpOutline, Settings, SettingsOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider ,IconButton, Tooltip } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { getDef, newBlockData } from './ToolDefinition';
import { BrowseProps, DeviceType, isServer, sanitizeBlockData, setDevice, useGetDevice, Util } from './utils/Util';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PropertyTab } from './Tab';
import './i18n';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export interface DMEditorProps{
    data:Array<any>, 
    menu?:React.ReactElement, 
    lang?:string, //default 'eng-GB'
    onChangeActive?:(activeBlock:Number)=>void,
    onChange?:(data:Array<any>)=>void,
    browseImage?:(props:BrowseProps)=>JSX.Element,
    browseLink?:(props:BrowseProps)=>JSX.Element,
    customProperty?:(props:any)=>JSX.Element,
    preBlock?:(props:any)=>JSX.Element,
    pageTab?:()=>JSX.Element,
    toast?:{error:(message:string, options:any)=>void, message:(message:string, options:any)=>void},
    pageTabActiveIndex?:number,
    getFileUrl?:(path:string)=>string,
    getImageUrl?:(path:string)=>string
}

export interface DMEditorViewProps{
  data:Array<any>,
  toast?:{error:(message:string, options:any)=>void, message:(message:string, options:any)=>void},
  getFileUrl?:(path:string)=>string,
  getImageUrl?:(path:string)=>string,
}

export const DMEditor = (props:DMEditorProps)=>{
    const [blocks, setBlocks] = useState(props.data?[...props.data]:[]);
    const [activeBlock, setActiveBlock] = useState(blocks.length>0?0:-1);
    const [newBlock, setNewBlock] = useState(false);
    const [viewmode, setViewmode] = useState('edit');
    const [settingsShown, setSettingsShown] = useState(false);
    const blocksRef = useRef(blocks); //use ref to avoid data issue when it's debounce change.
    const { t, i18n } = useTranslation();

    Util.fileUrl=props.getFileUrl
    Util.imageUrl=props.getImageUrl
    useEffect(()=>{
        if(props.lang){
          i18n.changeLanguage(props.lang)
        }
        Util.BrowseImage = props.browseImage
        Util.BrowseLink = props.browseLink
        Util.CustomProperty = props.customProperty
        Util.PreBlock = props.preBlock
        Util.pageTab = props.pageTab
        Util.toast=props.toast
        Util.pageTabActiveIndex=props.pageTabActiveIndex||0
    },[]);
    
    const showSettings = (e:any)=>{
      e.preventDefault();
      setSettingsShown(!settingsShown);
    }

    const addAbove = (type: string, index:number, template?:string)=>{
        if( type ){
            const defaultData = newBlockData(type, template);
            let allBlocks = [...blocks];
            allBlocks.splice(index, 0, defaultData );
            updateData(allBlocks);
            setNewBlock(true);
            setActiveBlock(index);
        }
    }
    const updateData = (blocks:any)=>{
        blocksRef.current = blocks;
        setBlocks(blocks);
        if( props.onChange){
            props.onChange(blocks)
        }
    };
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
            updateData(allBlocks);            
            setNewBlock(true);
            setActiveBlock(index+1);
        }
    }    

    const onDelete = ()=>{
        let fullBlocks = [...blocks];
        fullBlocks.splice(activeBlock, 1);           
        updateData(fullBlocks);
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
      updateData(fullBlocks);
    }

    const onChangeViewMode = (e:any,type:string)=>{
      e.preventDefault();
      setViewmode(type);
      if( type == 'pc' ){
        setDevice('')
      }else{
        setDevice(type as DeviceType);
      }
      setSettingsShown(false);     
    }
    


    const outerTheme= createTheme({
        palette:{
          primary:grey,
        },
        components:{          
          MuiTooltip:{
            styleOverrides:{   
              tooltip:{            
                backgroundColor: 'black',
                '& .MuiTooltip-arrow': {
                  color: 'black',
                }
              }
            }
          },
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
        <div className={(viewmode=='edit'?"  ":"view ") + (settingsShown?"settings ":"") + dmeditorEditCss}>
          <div className="layout-left">
            <div className={viewmode=='edit'?"layout-left-menu":"layout-left-menu view"}>
              {props.menu?props.menu:<a target='_blank' title='dmeditor' href="https://dmeditor.io"><div style={{paddingTop: '5px'}}><HelpOutline /></div></a>}
              <div className='left-tool' style={{position:'absolute', bottom:0, width:'100%', textAlign:'center'}}>                
                <Tooltip title={t("Edit")} arrow placement='right'>
                  <a href='/' className={viewmode=='edit'?'current':''} onClick={(e)=>{onChangeViewMode(e,'edit')}}><ModeEditOutline /></a>
                </Tooltip>
                <Tooltip title={t("Desktop")} arrow placement='right'>
                <a href='/' className={viewmode=='pc'?'current':''} onClick={(e)=>{onChangeViewMode(e,'pc')}}><LaptopMacOutlined /></a>
                </Tooltip>
                <Tooltip title={t("Mobile")} arrow placement='right'>
                <a href='/' className={viewmode=='mobile'?'current':''}  onClick={(e)=>{onChangeViewMode(e,'mobile')}}> <PhoneIphoneOutlined /></a>
                </Tooltip>
                <Tooltip title={t("Tablet")} arrow placement='right'>
                <a href='/' className={viewmode=='tablet'?'current':''}  onClick={(e)=>{onChangeViewMode(e,'tablet')}}><TabletMacOutlined /></a>
                </Tooltip>
                <hr />
                <Tooltip title={t("Settings")} arrow placement='right'>
                <a href="/" title="Settings" className={settingsShown?'current':''} onClick={(e)=>showSettings(e)}><SettingsOutlined /></a>
                </Tooltip>
              </div>
            </div>
          </div>        
           <div className='dme-settings' style={{display:settingsShown?'block':'none'}}>
            <div>
              {Util.renderPageTab()}
            </div>
          </div> 
          <div style={settingsShown?{display:'none'}:{}} id="dmeditor-main" className='layout-main-container'>               
          <div className={'layout-main '+' viewmode-'+viewmode+(viewmode==='edit'?'':' is-preview')}>
            {viewmode==='edit'&&<div className={dmeditorViewCss}>
              <div style={{width: '100%', height: 1}}></div>          
              {blocks.map((block, index)=>{
              const a = ()=>{
                  let currentSelected = activeBlock===index ;
                  return  <Block
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
                        let newBlocks = [...blocksRef.current]; //use updated ref to avoid old data
                        data = sanitizeBlockData(data);
                        newBlocks[index]=data;
                        updateData(newBlocks)
                        setNewBlock(false)
                      }}
                      onAddAbove={(type:string, template?:string)=>addAbove(type, index, template)} 
                      onAddUnder={(type:string, template?:string)=>addUnder(type, index, template)} />;         
              }
              return a();        
              }
              )} </div>}
              {viewmode!=='edit'&&<DMEditorView key={viewmode} data={blocks} getFileUrl={props.getFileUrl} getImageUrl={props.getImageUrl}/>}
          </div>                    
          </div>
          {viewmode=='edit'&&<div style={settingsShown?{display:'none'}:{}} className='layout-properties'>            
              <div id="dmeditor-add-menu">
                {blocks.length===0&&<MenuList onSelect={(type:string, template?:string)=>{addUnder(type, -1, template)}} /> }
              </div>
              <div style={{marginBottom:'100px'}}>
                <div id="dmeditor-property">
                    <div className='property-tab-container'></div>
                    <div></div>
                </div>
                {viewmode==='edit'&&<div style={{position:"fixed",bottom:0,height:'100px',width: '262px',padding:'10px', backgroundColor:'#ffffff'}}>
                    <div style={{marginBottom:'15px'}} >
                    <a href="/" title="Move up" onClick={(e)=>{e.preventDefault();onMove('up')}}><ArrowUpwardOutlined /> </a> 
                    <a href="/" title="Move down" onClick={(e)=>{e.preventDefault();onMove('down')}}><ArrowDownwardOutlined /></a>
                    </div> 
                    <Button fullWidth variant="contained" color='error' title="Delete" onClick={onDelete}>
                     <DeleteOutline />Delete block
                    </Button>
                </div>} 
              </div>            
          </div>}
        </div>
      </ThemeProvider>);
}

export const DMEditorView = (props:DMEditorViewProps)=>{
  const elRef = useRef(null);
  const [width, setWidth] = useState(0);

  Util.toast=props.toast
  Util.fileUrl=props.getFileUrl
  Util.imageUrl=props.getImageUrl
  const device = useGetDevice();

  useEffect(() => {
    if (!elRef?.current) {
      return;
    }
    const width = (elRef.current as any).clientWidth;
    setWidth(width);
  }, []);

    return <div ref={elRef} className={'dmeditor-view '+setMainWidthCssVariable(width+'px')+' '+dmeditorViewCss + (device!=''?' dmeditor-view-'+device+' ':'')}>
    {props.data.map((block, index)=>{
        const blockElement = ()=>{
           return  <Block
                    data={block} active={false} 
                    onCancel={()=>{}}
                    key={block.id}
                    onActivate={()=>{}} 
                    onChange={()=>{}}
                    onAddAbove={()=>{}} 
                    onAddUnder={()=>{}} 
                    view={true}
                    />                   
                    ;         
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
