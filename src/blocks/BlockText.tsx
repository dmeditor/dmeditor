import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty"

export const BlockText = (props:any)=>{
    const [size, setSize] = useState(1.1);
    const [align, setAlign] = useState('left' as 'left'|'center'|'right');

    return <div>
            <BlockProperty title={'Text'} active={props.active}>
                <div>
                    <label>Font size:</label>
                    <Input type='text' defaultValue={size} onChange={(e)=>setSize(parseFloat(e.target.value))} />
                </div>  
                <div>
                <label>Align:</label>
                <div>
                    <Button onClick={()=>setAlign('left')} variant={(align==='left'||align==undefined)?'outlined':undefined}><FormatAlignLeft /></Button>
                    <Button onClick={()=>setAlign('center')} variant={align==='center'?'outlined':undefined}><FormatAlignCenter /></Button>
                    <Button onClick={()=>setAlign('right')} variant={align==='right'?'outlined':undefined}><FormatAlignRight /></Button>
                </div>
                </div>            
            </BlockProperty>
            <div style={{fontSize: size+'em', textAlign:align}} dangerouslySetInnerHTML={{__html:props.data.content?props.data.content:'default text1111'}} />
            </div>
}