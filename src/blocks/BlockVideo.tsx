import { VideocamOutlined } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Input, Modal } from "@mui/material";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";


export const BlockVideo = (props:ToolRenderProps)=>{
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(240);
    const [adding, setAdding] = useState(props.adding?true:false);
    const [inputUrl, setInputUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState(props.data.content);
        
    const submitVideo = ()=>{
        setVideoUrl( inputUrl );
        props.onChange({type:'video', content: inputUrl});
        setAdding(false);
    }

    return <div style={{width: width,height:height}}>
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
                        <Button onClick={submitVideo} variant="contained">Submit</Button>
                    </Box>
                </DialogContent>                  
              </Dialog>
            </div>}
            <BlockProperty title={'Video'} active={props.active}>
                <div>
                    <label>Width: </label>
                    <input type="text" defaultValue={width} onChange={(e)=>setWidth(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Height: </label>
                    <input type="text" defaultValue={height} onChange={(e)=>setHeight(parseInt(e.target.value))} />
                </div>
            </BlockProperty>
            <video width={'100%'} height={'100%'} controls src={videoUrl} >
              <object data={videoUrl} width={'100%'} height={'100%'}>
                <embed src={videoUrl} width={'100%'} height={'100%'} />
              </object> 
            </video>
            
            </div>
}
export const toolVideo:ToolDefinition = {
    type: 'video',
    menu:  {text:"Video", category:'basic',icon: <VideocamOutlined /> },
    initData: {type:'video', content:'https://www.runoob.com/try/demo_source/movie.ogg'},
    view: (props:{data:any})=><BlockVideo data={props.data} active={false} onChange={()=>{}} />,
    render: (props:ToolRenderProps)=><BlockVideo {...props} />
}