import { AlignHorizontalLeftOutlined, AlignHorizontalRightOutlined, CollectionsOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Block } from "../../Block";
import {BlockList} from '../../BlockList';
import { BlockProperty } from "../../BlockProperty";
import { CommonSettings } from "../../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { PropertyButton, PropertyItem } from "../../utils";

const ImageHeadingText = (props:ToolRenderProps)=>{
    const [list, setList] = useState<Array<any>>(props.data.data);
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const onChange = (data:any, index:number)=>{
        let newList = [...list];
        newList[index]= data;
        setList(newList);
    }

    const changeAlign = ()=>{
        let newList = [...list];
        let data0 = newList[0];
        newList[0] = newList[1];
        newList[1] = data0;
        setList(newList);
        setActiveIndex(activeIndex==0?1:0);
    }

    // useEffect(()=>{
    //     props.onChange({...props.data, data: list, common: commonSettings});
    // }, [list, commonSettings]);

    let imageLeft = list[0].type==='image';

    return <div style={...commonSettings}>
        {props.active&&<BlockProperty blocktype="imagetext" inBlock={props.inBlock}>
            <PropertyItem label="Image position" autoWidth>
                <PropertyButton selected={imageLeft} onClick={()=>{if(!imageLeft){changeAlign()}}}>
                    <AlignHorizontalLeftOutlined />
                </PropertyButton>
                <PropertyButton selected={!imageLeft} onClick={()=>{if(imageLeft){changeAlign()}}}><AlignHorizontalRightOutlined /></PropertyButton>
            </PropertyItem>
            <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings)}} /></div>                 
        </BlockProperty>}
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
        data:[ 
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
