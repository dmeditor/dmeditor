import { Image, ImageNotSupported, ImageOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Input, Modal } from "@mui/material";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PropertyItem } from "../utils/Property";


export const BlockImage = (props:ToolRenderProps)=>{
    const [width, setWidth] = useState(300);
    const [fullScreen, setFullScreen] = useState(props.data.settings.fullScreen?true:false);    
    const [adding, setAdding] = useState(props.adding?true:false);
    const [inputUrl, setInputUrl] = useState('');
    const [imageUrl, setImageUrl] = useState(props.data.content);
        
    const submitImage = ()=>{
        setImageUrl( inputUrl );
        let data = props.data;
        props.onChange({...data, settings:{fullScreen: fullScreen} });
        setAdding(false);
    }

    return <div style={fullScreen?{marginLeft:'-60px',marginRight:'-60px'}:{}}>
            {adding&&<div>
                <Dialog
                    open={adding}
                    onClose={()=>setAdding(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <DialogTitle>Input url</DialogTitle>
                    <DialogContent>
                        <Box>
                            <Input onChange={e=>setInputUrl(e.target.value)} />
                            <Button onClick={submitImage} variant="contained">Submit</Button>
                        </Box>
                    </DialogContent>                  
                    </Dialog>
                    </div>}
            <BlockProperty title={'Image'} active={props.active}>
                <PropertyItem label="Width">
                    <input type="text" defaultValue={width} onChange={(e)=>setWidth(parseInt(e.target.value))} />
                </PropertyItem>
                <PropertyItem label="Full screen" autoWidth>
                    <Checkbox checked={fullScreen} onChange={(e, checked:boolean)=>setFullScreen(checked)} />
                </PropertyItem>
            </BlockProperty>

                <img width={'100%'} src={imageUrl} />        
            </div>
}

export const toolImage:ToolDefinition = {
    type: 'image',
    menu:  {text:"Image", category:'basic',icon: <ImageOutlined /> },
    initData: {type:'image', content:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png',
                settings:{}},
    render: (props:ToolRenderProps)=><BlockImage {...props} />
}