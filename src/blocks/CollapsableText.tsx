import { TitleOutlined } from '@mui/icons-material'
import { BlockProperty } from "../BlockProperty"
import { ToolDefinition } from "../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../CommonSettings';
import { PropertyItem, Util } from '../utils';
import { getCommonBlockCss } from '../Block';
import { css } from '@emotion/css';
import { Collapse } from 'react-bootstrap';
import { BlockList } from '../BlockList';
import { Input } from '@mui/material';

const defaultCss = css`
& .dme-common-title{
  cursor: pointer;
  font-weight: bold;
}

& .dme-common-title::after {
    content: '\\25be';
    color: #333333;
    margin-left: 3px;
    font-size: 1.3rem;
}

& .dme-common-title.dme-common-open::after{
    content: '\\25b4';
}

& .dme-common-title:hover{
  background-color: #f0f0f0;
}
`;

export const CollapsableText = (props:any)=>{
  const [title, setTitle] = useState( props.data.data.title );
  const [body, setBody] = useState( props.data.data.body );

  const [commonSettings, setCommonSettings] = useState(props.data.common?props.data.common:{});
  const [isChange,setIsChange] = useState(false);
  const [open, setOpen] = useState(false);  
  
  useEffect(()=>{
   if(isChange){
    props.onChange({...props.data,data:{title:title,body: body},settings:{common: commonSettings}});
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
           <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true)}} onDelete={props.onDelete}/></div>
        </BlockProperty>}
        <div style={commonSettings} className={defaultCss +' '+getCommonBlockCss('collapsable_text')}>
            <div className={'dme-common-title'+(open?' dme-common-open':'')} onClick={()=>setOpen(!open)}>{title}</div>
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
  view: (props:{data:any})=><CollapsableText data={props.data} active={false} onChange={()=>{}} />,
  render: (props:{data:any, active:boolean})=><CollapsableText {...props} />
}
