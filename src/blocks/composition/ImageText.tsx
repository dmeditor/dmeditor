import { AlignHorizontalLeftOutlined, AlignHorizontalRightOutlined,CollectionsOutlined } from "@mui/icons-material";
// import React from "react";
import React,{ useEffect, useState } from "react";
import { Block } from "../../Block";
import { BlockList } from '../../BlockList';
import { BlockProperty } from "../../BlockProperty";
import { CommonSettings } from "../../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { PropertyButton, PropertyItem, useIsMobile } from "../../utils";

const BlockImageText = (props: ToolRenderProps) => {
  const [list, setList] = useState<Array<any>>(props.data.children ? props.data.children : []);
  const [commonSettings, setCommonSettings] = useState(props.data.common);
  const [activeIndex, setActiveIndex] = useState(0);
  const [blockListWidth, setBlockListWidth] = useState(() => {
    let listData=props.data.children ? props.data.children : []
    let imageList =listData.filter((item: any) => item.type == 'image');
    let imgWidth=`calc(var(--dme-main-width)*0.5)`
    if (imageList.length > 0) {
      imgWidth = imageList[0]?.common?.width || imgWidth;
    }
    return `calc(var(--dme-main-width) - ${imgWidth})`
  });
  const [flexWrap,setFlexWrap]=useState('nowrap' as any);

  const isMobile = useIsMobile();
  
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

  useEffect(()=>{
    if(isMobile && list[0].type==='list' ){
        changeAlign();
    }
  }, [isMobile])

  useEffect(() => {
    let imageList = list.filter((item: any) => item.type == 'image');
    let imgWidth=`calc(var(--dme-main-width)*0.5)`
    if (imageList.length > 0) {
      imgWidth = imageList[0]?.common?.width || imgWidth;
    }
    if (imgWidth == '100%') {
      setBlockListWidth(`calc(var(--dme-main-width))`)
      setFlexWrap('wrap')
    } else {
      setBlockListWidth(`calc(var(--dme-main-width) - ${imgWidth})`)
      setFlexWrap('nowrap')
    }
    
    props.onChange({...props.data, children:list, common: commonSettings})
  }, [list,commonSettings])

  let imageLeft = list[0].type==='image';
  
  return <div style={...commonSettings}>      
    {props.active&&<BlockProperty blocktype="imagetext" inBlock={props.inBlock}>
      <PropertyItem label="Image position" autoWidth>
        <PropertyButton selected={imageLeft} onClick={()=>{if(!imageLeft){changeAlign()}}}>
          <AlignHorizontalLeftOutlined />
        </PropertyButton>
        <PropertyButton selected={!imageLeft} onClick={()=>{if(imageLeft){changeAlign()}}}><AlignHorizontalRightOutlined /></PropertyButton>
      </PropertyItem>
      <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings)}} onDelete={props.onDelete}/></div>                 
    </BlockProperty>}  
    <div className="imagetext_container" style={!isMobile?{display:'flex',flexWrap:flexWrap}:{}}>
      {list.map((item: any,index:any) => {
        return (
          <React.Fragment key={item.id?item.id:index}>
            {item.type == 'list' && <div style={{width:blockListWidth}}>
              <BlockList  view={props.view}  allowedType={['text', 'image', 'heading']} onChange={data=>onChange({...list[index], children:data}, index)} active={props.active&&activeIndex==index} list={list[index].children} onActivate={()=>setActiveIndex(index)} />
            </div>}
          {item.type!='list'&& <Block  view={props.view}  data={list[index]} inBlock={true} active={props.active&&activeIndex==index} onActivate={()=>setActiveIndex(index)} onChange={data=>onChange(data, index)} />}
          </React.Fragment>
        )
      })} 
        
    </div>
    </div>
}

export const toolImageText: ToolDefinition = {
    type: 'imagetext',
    isComposited: true,
    name:"Image text",
    menu:  {category:'blocks',icon: <CollectionsOutlined /> },
    initData: ()=>{
        return {
       type:'imagetext',
        settings:{childrenHorizontal: true},
        data:'',
        children:[ 
            {type:'image', data:{url:'https://p3.itc.cn/q_70/images03/20210617/7391a10649bb4756b97925dddfb26f65.jpeg'},settings:{}},
            {type:'list', children:[
                {type:'heading', id:'1', data:'Title', common:{}, settings:{level: 2}},
                {"type":"text", id:'2', "data":[
                    {type:"paragraph","children":[
                        {"text":"Default text"}
                    ]}
                    ]}, 
                {"type":"text", id:'3', "data":[
                {type:"paragraph","align":"right","children":[{"text":""},{"url":"http://google.com","type":"link","source":{"sourceType":"input"},"children":[{"text":"Read more"}],"styleConfig":{"style":"button","setting":{"size":"small","variant":"contained"}}},{"text":""}]}            
              ]}
            ],"common":{}, "setting":{}}
            ]}
    },
    view: (props:{data:any})=><BlockImageText view={true} data={props.data} active={false} onChange={()=>{}} inBlock={false} />,
    render:BlockImageText    
}
