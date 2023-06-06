import { AlignHorizontalLeftOutlined, AlignHorizontalRightOutlined,CollectionsOutlined } from "@mui/icons-material";
// import React from "react";
import React,{ useEffect, useState } from "react";
import { Block, getCommonBlockCss, getStyleCss } from "../../Block";
import { BlockList } from '../../BlockList';
import { BlockProperty } from "../../BlockProperty";
import { CommonSettings } from "../../CommonSettings";
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { PropertyButton, PropertyItem, useGetDevice } from "../../utils";
import { css } from "@emotion/css";
import { StyleSettings } from "../../styles/StyleSettings";

const imagetextStyle = css`
  //mobile style
  .dmeditor-view-mobile & {
      .block-type-image{
      width: 100% !important;
    }

    .dme-imagetext-container > div{
      width: 100% !important;
    }
}
`

const BlockImageText = (props: ToolRenderProps) => {
  const [list, setList] = useState<Array<any>>(props.data.children ? props.data.children : []);
  const [commonSettings, setCommonSettings] = useState(props.data.common);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(() => {
    let listData=props.data.children ? props.data.children : []
    let imagelist =listData.filter((item: any) => item.type == 'image');
    let imgWidth='50%'
    if (imagelist.length > 0) {
      imgWidth = imagelist[0]?.common?.width || imgWidth;
      if( Number.isInteger( imgWidth ) ){
        imgWidth = imgWidth+ 'px';
      }
    }
    return imgWidth;
  });
  const [styleIdentifier, setStyleIdentifier] = useState(props.data.style);
  const [flexWrap,setFlexWrap]=useState('nowrap' as any);

  const isMobile = useGetDevice() == 'mobile';
  
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
    let imgWidth='50%'
    if (imageList.length > 0) {
      imgWidth = imageList[0]?.common?.width || imgWidth;
      if( Number.isInteger( imgWidth ) ){
        imgWidth = imgWidth+ 'px';
      }
    }
    if (imgWidth == '100%') {
      setImageWidth('100%')
      setFlexWrap('wrap')
    } else {
      setImageWidth(`${imgWidth}`)
      setFlexWrap('nowrap')
    }
    
    props.onChange({...props.data, children:list, style: styleIdentifier, common: commonSettings})
  }, [list,commonSettings, styleIdentifier])

  let imageLeft = list[0].type==='image';
  
  return <div style={...commonSettings} className={getCommonBlockCss('imagetext', styleIdentifier)+' '+imagetextStyle}>
    {props.active&&<BlockProperty blocktype="imagetext" inBlock={props.inBlock}>
      <PropertyItem label="Image position" autoWidth>
        <PropertyButton selected={imageLeft} onClick={()=>{if(!imageLeft){changeAlign()}}}>
          <AlignHorizontalLeftOutlined />
        </PropertyButton>
        <PropertyButton selected={!imageLeft} onClick={()=>{if(imageLeft){changeAlign()}}}><AlignHorizontalRightOutlined /></PropertyButton>
      </PropertyItem>
      <StyleSettings styleIdentifier={props.data.style||''} blocktype='imagetext' onChange={(identifier:string)=>setStyleIdentifier( identifier)} />
      <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>{setCommonSettings(settings)}} onDelete={props.onDelete}/></div>                 
    </BlockProperty>}  
    <div className="dme-imagetext-container" style={!isMobile?{display:'flex',flexWrap:flexWrap}:{}}>
      {list.map((item: any,index:any) => {
        return (
          <React.Fragment key={item.id?item.id:index}>
            {item.type == 'list' && <div style={{width:'calc(100% - '+imageWidth+')'}}>
              <BlockList  view={props.view}  allowedType={['text', 'image', 'heading']} onChange={data=>onChange({...list[index], children:data}, index)} active={props.active&&activeIndex==index} list={list[index].children} onActivate={()=>setActiveIndex(index)} />
            </div>}
          {item.type!='list'&& <div style={{width: imageWidth }}><Block  view={props.view}  data={list[index]} inBlock={true} active={props.active&&activeIndex==index} onActivate={()=>setActiveIndex(index)} onChange={data=>onChange(data, index)} /></div>}
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
            {type:'image', data:{url:'https://cdn.jsdelivr.net/gh/dmeditor/templates@main/forsythia_1280.jpg'},settings:{}},
            {type:'list', children:[
                {type:'heading', id:'1', data:'Title', common:{}, settings:{level: 2}},
                {"type":"text", id:'2', "data":[
                    {type:"paragraph","children":[
                        {"text":"Default text"}
                    ]}
                    ]}, 
                {"type":"text", id:'3', "data":[
                {type:"paragraph","align":"right","children":[{"text":""},{"url":"http://google.com","type":"link","source":{"sourceType":"input"},"children":[{"text":"Read more"}],"styleConfig":{"style":"button","setting":{"size":"small","color":"primary","variant":"outlined"}}},{"text":""}]}            
              ]}
            ],"common":{}, "setting":{}}
            ]}
    },
    render:BlockImageText    
}
