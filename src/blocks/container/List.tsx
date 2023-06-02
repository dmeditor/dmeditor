import { GridViewOutlined, ListAltOutlined, TitleOutlined } from '@mui/icons-material'
import { BlockProperty } from "../../BlockProperty"
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../../CommonSettings';
import { PropertyItem, Ranger, Util } from '../../utils';
import { getCommonBlockCss } from '../../Block';
import { BlockList } from '../../BlockList';
import { TemplateSettings } from '../../templates/TemplateSettings';
import React from 'react';


export const ContainerList = (props:any)=>{
  const [children, setChildren] = useState( props.data.children );
  const [isChange,setIsChange] = useState(false);
  const [template, setTemplate] = useState(props.data.template||'');

  useEffect(()=>{
   if(isChange){
    props.onChange({...props.data,template:template,children:children});
    setIsChange(false)
   }
  },[isChange])

  return (
    <>
       {props.active&&<BlockProperty  blocktype="container_list" inBlock={props.inBlock}>           
           <TemplateSettings template={props.data.template||''} blocktype='container_list' onChange={(identifier)=>{setTemplate(identifier); setIsChange(true)}} />
        </BlockProperty>}
        <div className={getCommonBlockCss('container_list', template)}>
            <BlockList view={props.view} allowedType={['heading','image', 'text','collapsable_text' ]} onChange={data=>{setChildren(data);setIsChange(true)}} active={props.active} list={children}  onActivate={()=>{}}/>
        </div>
    </>
  )
  
}


export const toolContainerList:ToolDefinition = {
  type: 'container_list',
  isComposited: false,
  name:"List", 
  menu:  {category:'basic',icon: <ListAltOutlined /> },
  initData: ()=>{
    return  {
    type: 'container_list',
    children: [{type:'heading',
    settings:{}},
        {"type":"text", id:'2', "data":[
            {type:"paragraph","children":[
                {"text":"Default text 1"}
            ]},           
          ]
        }]          
    }   
  },
  view: (props:{data:any})=><ContainerList view={true} data={props.data} active={false} onChange={()=>{}} />,
  render: (props:ToolRenderProps)=><ContainerList {...props} />
}
