import { TitleOutlined } from '@mui/icons-material'
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../CommonSettings';
import { PropertyItem, Util } from '../utils';
import { getCommonBlockCss } from '../Block';
import { css } from '@emotion/css';
import { Collapse } from 'react-bootstrap';
import { BlockList } from '../BlockList';
import { Input } from '@mui/material';
import { TemplateSettings } from '../templates/TemplateSettings';

const defaultCss = css`
& .dme-common-title span{
  cursor: pointer;
}

& .dme-common-title span::after {
    content: '\\25be';
    margin-left: 3px;
    font-size: 1.3rem;
}

& .dme-common-title.dme-common-open span::after{
    content: '\\25b4';
}

& .dme-common-title span:hover{
  background-color: #f0f0f0;
}
`;

export const CollapsableText = (props:any)=>{
  const [title, setTitle] = useState( props.data.data.title );
  const [body, setBody] = useState( props.data.data.body );

  const [commonSettings, setCommonSettings] = useState(props.data.common?props.data.common:{});
  const [isChange,setIsChange] = useState(false);
  const [template, setTemplate] = useState(props.data.template||'');
  const [open, setOpen] = useState(false);  
  
  useEffect(()=>{
   if(isChange){
    props.onChange({...props.data,template:template,data:{title:title,body: body},settings:{common: commonSettings}});
    setIsChange(false)
   }
  },[isChange])

  return (
    <>
       {props.active&&<BlockProperty  blocktype="collapsable_text" inBlock={props.inBlock}>
           <PropertyItem label="Text">
                <Input defaultValue={title} onChange={e=>{setTitle(e.target.value); setIsChange(true)}} />
            </PropertyItem>
           {Util.renderCustomProperty(props.data)}
           <TemplateSettings template={props.data.template} blocktype='collapsable_text' onChange={(identifier)=>{setTemplate(identifier); setIsChange(true)}} />
           <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true)}} onDelete={props.onDelete}/></div>
        </BlockProperty>}
        <div style={commonSettings} className={defaultCss +' '+getCommonBlockCss('collapsable_text', template)}>
            <div className={'dme-common-title'+(open?' dme-common-open':'')} onClick={()=>setOpen(!open)}>
              <span>{title}</span>
            </div>
            <Collapse in={open}>
                <div className='dme-common-body'>
                <BlockList view={props.view} allowedType={['text', 'heading','image']} onChange={data=>{setBody(data); setIsChange(true)}} active={props.active} list={body}  onActivate={()=>{}}/>
              </div>
            </Collapse>
        </div>
    </> 
  )
  
}


export const toolCollapsableText:ToolDefinition = {
  type: 'collapsable_text',
  isComposited: false,
  name:"Collapsable text", 
  menu:  {category:'basic',icon: <TitleOutlined /> },
  initData: ()=>{
    return {type:'collapsable_text',
    settings:{},
    data:{ title:'Show more', body: [
        {"type":"text", id:'2', "data":[
            {type:"paragraph","children":[
                {"text":"Default text"}
            ]},           
          ]
        }, 
        ] }
  } 
  },
  view: (props:{data:any})=><CollapsableText view={true} data={props.data} active={false} onChange={()=>{}} />,
  render: (props:ToolRenderProps)=><CollapsableText {...props} />
}
