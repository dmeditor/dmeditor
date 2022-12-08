import { AlignHorizontalLeftOutlined, AlignHorizontalRightOutlined, CollectionsOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Block, DefBlock } from "../../Block";
import {DefContainer} from '../../BlockContainer';
import { BlockProperty } from "../../BlockProperty";
import { CommonSettings } from "../../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { PropertyButton, PropertyItem } from "../../utils";

const BlockImageText = (props:ToolRenderProps)=>{
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
    }

    useEffect(()=>{
        props.onChange({...props.data, data: list});
    }, [list, commonSettings]);

    let imageLeft = list[0].type==='image';

    return <div style={...commonSettings}>
        {props.active&&<BlockProperty>
            <PropertyItem label="Image position" autoWidth>
                <PropertyButton selected={imageLeft} onClick={()=>{if(!imageLeft){changeAlign()}}}>
                    <AlignHorizontalLeftOutlined />
                </PropertyButton>
                <PropertyButton selected={!imageLeft} onClick={()=>{if(imageLeft){changeAlign()}}}><AlignHorizontalRightOutlined /></PropertyButton>
            </PropertyItem>
            <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings)}} /></div>                 
        </BlockProperty>}
        <div className="row">
            <div className="col-6">
                <Block data={list[0]} active={props.active&&activeIndex==0} onActivate={()=>setActiveIndex(0)} onChange={data=>onChange(data, 0)} />
            </div>
            <div className="col-6">
                <Block data={list[1]} active={props.active&&activeIndex==1} onActivate={()=>setActiveIndex(1)} onChange={data=>onChange(data, 1)} />
            </div>
        </div>
    </div>
}

export const toolImageText: ToolDefinition = {
    type: 'imagetext',
    isComposited: true,
    menu:  {text:"Image text", category:'blocks',icon: <CollectionsOutlined /> },
    initData: {
        type:'imagetext',
        settings:{childrenHorizontal: true},
        data:[ 
                {type:'image', data:{url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhze-QNnca2liBrhRj4CjswGZSkqbhvSDJsQ&usqp=CAU'},settings:{}},
                {"type":"text","data":[
                    {"type":"paragraph","children":[{"text":"Default text"},
                    {"type":"paragraph","align":"center","children":[{"text":""},{"url":"http://google.com","type":"link","source":{"sourceType":"input"},"children":[{"text":"Button"}],"styleConfig":{"style":"button","setting":{"size":"small","variant":"contained"}}},{"text":""}]}            
            ]},                                                           
            ],"common":{}}
             ]},
    view: (props:{data:any})=><div>Not implemented</div>,
    render:BlockImageText    
}
