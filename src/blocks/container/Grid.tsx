import { GridViewOutlined, TitleOutlined } from '@mui/icons-material'
import { BlockProperty } from "../../BlockProperty"
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { useState,useEffect,useRef } from 'react'
import { CommonSettings } from '../../CommonSettings';
import { PropertyItem, Ranger, Util } from '../../utils';
import { getCommonBlockCss } from '../../Block';
import { BlockList } from '../../BlockList';
import { StyleSettings } from '../../styles/StyleSettings';


export const ContainerGrid = (props:any)=>{
  const [children, setChildren] = useState( props.data.children );
  const [commonSettings, setCommonSettings] = useState(props.data.common?props.data.common:{});
  const [isChange,setIsChange] = useState(false);
  const [styleIdentifier, setStyleIdentifier] = useState(props.data.style||'');
  const [columns, setColumns] = useState(props.data.settings?.columns||1);

  useEffect(()=>{
   if(isChange){
    props.onChange({...props.data,style:styleIdentifier,children:children,settings:{columns:columns,common: commonSettings}});
    setIsChange(false)
   }
  },[isChange])

  return (
    <>
       {props.active&&<BlockProperty  blocktype="grid" inBlock={props.inBlock}>
           <PropertyItem label="Columns">
              <Ranger value={columns} min={1} max={5} onChange={v=>{setColumns(v);setIsChange(true)}} />
            </PropertyItem>
           {Util.renderCustomProperty(props.data)}
           <StyleSettings styleIdentifier={props.data.style||''} blocktype='grid' onChange={(identifier)=>{setStyleIdentifier(identifier); setIsChange(true)}} />
           <div><CommonSettings commonSettings={commonSettings}  settingList={[]} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true)}} onDelete={props.onDelete}/></div>
        </BlockProperty>}
        <div style={commonSettings} className={getCommonBlockCss('grid', styleIdentifier)}>
                <BlockList adding={props.adding} columns={columns} view={props.view} allowedType={['collapsable_text','list', 'text']} onChange={data=>{setChildren(data);setIsChange(true)}} active={props.active} list={children}  onActivate={()=>{}}/>
        </div>
    </> 
  )
  
}


export const toolContainerGrid:ToolDefinition = {
  type: 'grid',
  isComposited: false,
  name:"Grid", 
  menu:  {category:'basic',icon: <GridViewOutlined /> },
  initData: ()=>{
    return  {
    type: 'grid',
    settings:{columns:2},
    children: [] 
  }
  },
  render: (props:ToolRenderProps)=><ContainerGrid {...props} />
}
