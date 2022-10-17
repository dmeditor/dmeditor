import { Image, ImageNotSupported } from "@mui/icons-material";
import { useState } from "react";
import { BlockProperty } from "../BlockProperty";


export const BlockImage = (props:any)=>{
    const [width, setWidth] = useState(300);

    return <div style={{width: width}}>
            <BlockProperty title={'Image'} active={props.active}>
                <div>
                    <label>Width: </label>
                    <input type="text" defaultValue={width} onChange={(e)=>setWidth(parseInt(e.target.value))} />
                </div>
            </BlockProperty>

            {props.data.content?<img width={'100%'} src={props.data.content} />:            
            <div><img width={'100%'} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png'} /></div>
            }
            </div>
}