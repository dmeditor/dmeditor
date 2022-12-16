import { AlignHorizontalLeftOutlined, AlignHorizontalRightOutlined, CollectionsOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Block } from "../../Block";
import {BlockList} from '../../BlockList';
import { BlockProperty } from "../../BlockProperty";
import { CommonSettings } from "../../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { PropertyButton, PropertyItem } from "../../utils";

const ImageHeadingText = (props:ToolRenderProps)=>{
    const [list, setList] = useState<Array<any>>(props.data.children?props.data.children:[]);
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const onChange = (data:any, index:number)=>{
        let newList = [...list];
        newList[index]= data;
        setList(newList);
    }

    return <div style={...commonSettings}>       
        <div className="dm-columns columns-2">
            <div>
                <Block data={list[0]} inBlock={true} active={props.active&&activeIndex==0} onActivate={()=>setActiveIndex(0)} onChange={data=>onChange(data, 0)} />
            </div>
            <div>
                <BlockList allowedType={['text', 'heading']} active={props.active&&activeIndex==1} data={list[1].data} onActivate={()=>setActiveIndex(1)} />
            </div>
        </div>
    </div>
}

export const toolImageHeadingText: ToolDefinition = {
    type: 'image_heading_text',
    isComposited: true,
    menu:  {text:"Image heading text", category:'blocks',icon: <CollectionsOutlined /> },
    initData: {
        type:'image_heading_text',
        settings:{childrenHorizontal: true},
        data:'',
        children:[ 
            {type:'image', data:{url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhze-QNnca2liBrhRj4CjswGZSkqbhvSDJsQ&usqp=CAU'},settings:{}},
            {type:'container', data:[
                {type:'heading', id:'1', data:'Title', common:{color: '#ff0000'}, settings:{level: 2}},
                {"type":"text", id:'2', "data":[
                    {type:"paragraph","children":[
                        {"text":"Default text"}
                    ]},
                    {type:"paragraph","align":"center","children":[
                        {"url":"http://google.com","type":"link","source":{"sourceType":"input"},"children":[{"text":"Button"}],"styleConfig":{"style":"button","setting":{"size":"small","variant":"contained"}}}
                    ]}
                    ]}, 
                {"type":"text", id:'3', "data":[
                {type:"paragraph","align":"right","children":[{"text":""},{"url":"http://google.com","type":"link","source":{"sourceType":"input"},"children":[{"text":"Read more"}],"styleConfig":{"style":"button","setting":{"size":"small","variant":"contained"}}},{"text":""}]}            
              ]}
            ],"common":{}, "setting":{}}
            ]},
    view: (props:{data:any})=><ImageHeadingText data={props.data} active={false} onChange={()=>{}} inBlock={false} />,
    render:ImageHeadingText    
}
