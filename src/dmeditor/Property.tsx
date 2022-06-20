import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { blockManager } from "./BlockManager";
import { BlockInfo, BlockLayoutData } from "./Main"
import { DMTab } from "./Tab"
import { Input } from "./utils/Input";
import { Ranger } from "./utils/Ranger";

export const Property = (props:{current: BlockInfo, onSeting: any, onDelete:any})=>{

    const current = props.current;

    const renderProperty = ()=>{
        const handler = blockManager.getBlockType(current.type);
        if( handler ){
            return handler.renderSetting(current.content, props.onSeting);
        }else{
            return <div>Unknown type {current.type}</div>;
        }
    }

    const content = <div>{renderProperty()}<div>  
        <br />           
        <Button fullWidth variant="contained" color='error' title="Delete" onClick={props.onDelete}>
            <DeleteOutline />Delete block
        </Button>
    </div></div>


    return <div>
        <DMTab content={content} />
    </div>
}

export const CommonSetting = (props:{settings:BlockLayoutData, onChange?:any})=>{
    const [open, setOpen] = useState(true);

    const change = (settings:BlockLayoutData)=>{
        if( props.onChange ){
            props.onChange(settings);   
        }
    }

    return <div style={{marginTop:'20px', marginBottom:'20px'}}>
            <div>
            <a onClick={()=>setOpen(!open)} style={{fontSize:'1rem'}}>Layout</a>
            </div>
            {open&&<>                      
            <table style={{width: '100%', margin:'5px'}}>
                <tr><td><label>Background color:</label></td>
                <td><Input defaultValue={props.settings.backgroundColor} onChange={(v:string)=>change({...props.settings, backgroundColor: v})} /></td>
                </tr>  
                <tr><td width={'30%'}><label>Padding:</label></td>
                <td><Ranger min={0} max={20} step={1} onChange={(v:number)=>change({...props.settings, padding: v})} defaultValue={props.settings.padding} /></td>
                </tr>
                <tr><td><label>Margin top:</label></td>
                <td><Ranger min={0} max={50} onChange={(v:number)=>change({...props.settings, marginTop: v})} step={1} defaultValue={props.settings.marginTop?props.settings.marginTop:0} /></td>
                </tr>    
            </table></>}    
            </div>
}