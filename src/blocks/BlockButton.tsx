import { SmartButtonOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";

export const BlockButton = (props:any)=>{
    const [size, setSize] = useState('small' as ('small' | 'medium' | 'large'));
    const [color, setColor] = useState('success' as ('inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'));
    const [variant, setVariant] = useState('contained' as ('text' | 'outlined' | 'contained'));


    return <div>
            {props.active&&<BlockProperty blocktype="button">
                <div>
                    <label>Size:</label>
                    <Button onClick={()=>setSize('small')}>Small</Button>
                    <Button onClick={()=>setSize('medium')}>Medium</Button>
                    <Button onClick={()=>setSize('large')}>Large</Button>
                </div>
                <div>
                    <label>Color:</label>
                    <Button variant="text" onClick={()=>setColor('success')}>Success</Button>
                    <Button variant="text" onClick={()=>setColor('secondary')}>Secondary</Button>
                    <Button variant="text" onClick={()=>setColor('error')}>Error</Button>
                </div>
                <div>
                    <label>Style:</label>
                    <Button variant="text" onClick={()=>setVariant('contained')}>Fill</Button>
                    <Button variant="text" onClick={()=>setVariant('outlined')}>Ourlined</Button>
                    <Button variant="text" onClick={()=>setVariant('text')}>Text</Button>
                </div>
            </BlockProperty>}

            {props.data.content?<Button />:<Button color={color} size={size} variant={variant}><span>default button</span></Button>}
            </div>
}

export const toolButton:ToolDefinition = {
    type: 'button',
    name: '',
    menu:{text:'Button', category:'_internal', icon: <span></span> },
    initData: {type:'button', content:''},
    view: (props:{data:any})=><BlockButton data={props.data} active={false} onChange={()=>{}} />,
    render: (props:{data:any, active:boolean})=><BlockButton {...props} />
}