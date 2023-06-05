import { DeleteOutline, GridViewOutlined, ListAltOutlined, TitleOutlined } from '@mui/icons-material'
import { BlockProperty } from "../../BlockProperty"
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../../CommonSettings';
import { PropertyButton, PropertyItem, Ranger, Util } from '../../utils';
import { getCommonBlockCss } from '../../Block';
import { BlockList } from '../../BlockList';
import { StyleSettings } from '../../styles/StyleSettings';
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
       {props.active&&<BlockProperty  blocktype="list" inBlock={props.inBlock}>           
           <StyleSettings template={props.data.template||''} blocktype='list' onChange={(identifier)=>{setTemplate(identifier); setIsChange(true)}} />
           {props.onDelete&&
            <div style={{float: 'right'}}>
              <PropertyButton color="warning" title="Delete" onClick={()=>{if(props.onDelete)props.onDelete()}}><DeleteOutline /></PropertyButton>
            </div>
          }
        </BlockProperty>}
        <div className={getCommonBlockCss('list', template)}>
            <BlockList view={props.view} allowedType={['heading','image', 'text','collapsable_text' ]} onChange={data=>{setChildren(data);setIsChange(true)}} active={props.active} list={children}  onActivate={()=>{}}/>
        </div>
    </>
  )
  
}


export const toolContainerList:ToolDefinition = {
  type: 'list',
  isComposited: false,
  name:"List", 
  menu:  {category:'basic',icon: <ListAltOutlined /> },
  initData: ()=>{
    return  {
    type: 'list',
    children: [{type:'heading', 
    settings:{level:2},
    data:'Heading'},
        {"type":"text", id:'2', "data":[
            {type:"paragraph","children":[
                {"text":"Default text 1"}
            ]},           
          ]
        }]          
    }   
  },
  render: (props:ToolRenderProps)=><ContainerList {...props} />
}
