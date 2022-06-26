import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { blockManager } from "./BlockManager";
import { BlockInfo, BlockLayoutData } from "./types"
import { DMTab } from "./Tab"
import { Ranger } from "./utils/Ranger";
import { SketchPicker } from 'react-color';

export const Property = (props:{current: BlockInfo, params:any, onSeting: any, onDelete:any})=>{

    const current = props.current;

    const renderProperty = ()=>{
        const handler = blockManager.getBlockType(current.type);
        if( handler ){
            const Settings = handler.renderSetting;
            const settings = <Settings data={current.content} onSetting={props.onSeting} params={props.params} />;
            if( handler.canSelectElement ){
                return settings;
            }else{
                return <div><DMTab tabs={[{text:'Block', content: settings}]} /></div>
            }
        }else{
            return <div>Unknown type {current.type}</div>;
        }
    }

    return <div style={{display:'grid', height:'100vh', gridTemplateRows:'auto 100px'}}>{renderProperty()}
    <div style={{padding: 10}}>  
        <div style={{marginBottom:'15px'}}>
            <a href="#" title="Move up"><ArrowUpwardOutlined /> </a> 
            <a href="#"  title="Move down"><ArrowDownwardOutlined /></a></div>
        <Button fullWidth variant="contained" color='error' title="Delete" onClick={props.onDelete}>
            <DeleteOutline />Delete block
        </Button>
    </div></div>
}

export const CommonSetting = (props:{settings:BlockLayoutData, onChange?:any})=>{
    const [open, setOpen] = useState(true);
    const [showColorPicker, setShowColorPicker] = useState(false);
    

    const change = (settings:BlockLayoutData)=>{
        if( props.onChange ){
            props.onChange(settings);   
        }
    }

    let originalColor:string = '';
    const changeColor = (color: any)=>{
        if(originalColor===''){
            originalColor = props.settings.backgroundColor?props.settings.backgroundColor:'';
        }
        change({...props.settings, backgroundColor: color.hex})
    }

    const resetColor = ()=>{
        change({...props.settings, backgroundColor: originalColor}) 
        setShowColorPicker(false);       
    }

    return <div style={{marginTop:'20px', marginBottom:'20px'}}>
            <div>
            <a onClick={()=>setOpen(!open)} style={{fontSize:'1rem'}}>Layout</a>
            </div>
            {open&&<>                      
            <table style={{width: '100%', margin:'5px'}}>
                <tr><td colSpan={2}>
                    <table>
                        <tr><td>
                        <label>Background color:</label>
                        </td>
                        <td>
                        <span onClick={(e)=>{e.stopPropagation();setShowColorPicker(!showColorPicker)}} style={{display:'inline-block', border: '1px solid #cccccc', cursor: 'pointer', width:'30px', height: '30px', borderRadius: 20, background:props.settings.backgroundColor }}></span>
                        {showColorPicker&&<div style={{position:'absolute', right: 0, zIndex:100}}>
                        <SketchPicker presetColors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]} color={props.settings.backgroundColor?props.settings.backgroundColor:'#F5FFE3'} disableAlpha={true} onChange={changeColor} />
                        <div style={{padding:5}}><a href='javascript:void(0)' onClick={resetColor}>Reset</a></div>
                        </div>}
                        </td>
                        </tr>
                    </table>
                </td>
                </tr>  
                <tr><td width={'30%'}><label>Padding:</label></td>
                <td><Ranger min={0} max={20} step={1} onChange={(v:number)=>change({...props.settings, padding: v})} defaultValue={props.settings.padding?props.settings.padding:0} /></td>
                </tr>
                <tr><td><label>Margin top:</label></td>
                <td><Ranger min={0} max={50} onChange={(v:number)=>change({...props.settings, marginTop: v})} step={1} defaultValue={props.settings.marginTop?props.settings.marginTop:0} /></td>
                </tr>    
            </table></>}    
            </div>
}