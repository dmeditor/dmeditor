import { GridViewOutlined, TitleOutlined } from '@mui/icons-material'
import { BlockProperty } from "../../BlockProperty"
import { ToolDefinition } from "../../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../../CommonSettings';
import { PropertyItem, Ranger, Util } from '../../utils';
import { getCommonBlockCss } from '../../Block';
import { BlockList } from '../../BlockList';
import { TemplateSettings } from '../../templates/TemplateSettings';


export const ContainerGrid = (props:any)=>{
  const [children, setChildren] = useState( props.data.children );
  const [commonSettings, setCommonSettings] = useState(props.data.common?props.data.common:{});
  const [isChange,setIsChange] = useState(false);
  const [template, setTemplate] = useState(props.data.template||'');
  const [columns, setColumns] = useState(props.data.settings?.columns||1);

  useEffect(()=>{
   if(isChange){
    props.onChange({...props.data,template:template,children:children,settings:{columns:columns,common: commonSettings}});
    setIsChange(false)
   }
  },[isChange])

  return (
    <>
       {props.active&&<BlockProperty  blocktype="container_grid" inBlock={props.inBlock}>
           <PropertyItem label="Columns">
              <Ranger value={columns} min={1} max={5} onChange={v=>setColumns(v)} />
            </PropertyItem>
           {Util.renderCustomProperty(props.data)}
           <TemplateSettings template={props.data.template||''} blocktype='container_grid' onChange={(identifier)=>{setTemplate(identifier); setIsChange(true)}} />
           <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true)}} onDelete={props.onDelete}/></div>
        </BlockProperty>}
        <div style={commonSettings} className={getCommonBlockCss('container_grid', template)}>
                <BlockList columns={columns} view={props.view} allowedType={['collapsable_text', 'text']} onChange={data=>{setChildren(data);setIsChange(true)}} active={props.active} list={children}  onActivate={()=>{}}/>
        </div>
    </> 
  )
  
}


export const toolContainerGrid:ToolDefinition = {
  type: 'container_grid',
  isComposited: false,
  name:"Grid", 
  menu:  {category:'basic',icon: <GridViewOutlined /> },
  initData: ()=>{
    return  {
    type: 'container_grid',
    settings:{columns:2},
    children: [{type:'collapsable_text',
    settings:{},
    data:{ title:'Show more', body: [
        {"type":"text", id:'2', "data":[
            {type:"paragraph","children":[
                {"text":"Default text 1"}
            ]},           
          ]
        }, 
        ] }
  }] 
  }
  },
  view: (props:{data:any})=><ContainerGrid data={props.data} active={false} onChange={()=>{}} />,
  render: (props:{data:any, active:boolean})=><ContainerGrid {...props} />
}
