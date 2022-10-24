import { CollectionsOutlined } from "@mui/icons-material";
import React from "react";
import { DefBlock } from "../../Block";
import {DefContainer} from '../../BlockContainer';
import { ToolDefinition } from "../../ToolDefinition";

export const toolImageText: ToolDefinition = {
    type: 'imagetext',
    isComposited: true,
    menu:  {text:"Image text", category:'basic',icon: <CollectionsOutlined /> },
    initData: {
        type:'imagetext',
        settings:{childrenHorizontal: true},
        children: [
        {type:'text', content:'<p>Hello</p><p>Good</p>', settings:{}},
        {type:'image', content:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOdlzDI3LftAb4bwkJOWODiyLE9bpB3Wr8r9A60RGy1A&s', settings:{}}
        ], allowedType:["text"]},
    render: (props:{data:any, active:boolean})=><DefContainer type='imagetext' horizontal allowedType={["image", "container"]}>
        <DefBlock type="image" required={true} allowedSettings={['leftright']} />
        <DefContainer required={true} allowedType={["text", "container"]}>
            <DefBlock required={true} type="text" />
            <DefContainer align='center' allowedType="button">
                <DefBlock type="button" required={true} max={3} min={1} />
            </DefContainer>
        </DefContainer>
    </DefContainer>
}