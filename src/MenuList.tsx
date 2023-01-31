import { Input } from '@mui/material';
import { useState } from 'react';
import { blockManager } from './BlockManager';
import {menulistCss} from './MenuList.css';
import { PropertyTab } from './Tab';
import { getAllTemplates, getCategories, getDef, getToolDefinitions } from './ToolDefinition';

export const MenuList = (props:{onSelect:any, allowedType?:string[]})=>{
    const [blockCategory] = useState(getCategories());
    const [registeredTypes] = useState(getToolDefinitions());
    const [templates] = useState(getAllTemplates());
    

    let names: Array<{type: string, name: string}> = [];
    for( let blockType of Object.keys( registeredTypes ) ){
        if( props.allowedType && !props.allowedType.includes(blockType) ){
            continue;
        }
        const toolType = registeredTypes[blockType];
        if( toolType.name ){
            names = [...names, {type: blockType, name: toolType.name}];
        }
    }

    const [list, setList] = useState(names);

    const search = (e:any)=>{
        let input = e.target.value.toLowerCase();
        let list = names.filter((item)=>item.name.toLowerCase().includes(input))
        setList(list);
    };

    return (<div className={menulistCss} style={{background: 'white'}}>
        <div style={{fontSize:'18px', padding: '10px 4px'}}>Please choose a block type:</div>
        <PropertyTab tabs={[{title:'Blocks', element: <div>
                    <div style={{background:'white'}}>
                    <Input fullWidth placeholder='Type to search' onChange={search} autoFocus style={{padding: '6px'}} />
                    </div>
                    <div className='menu-blocktype'>
                    {blockCategory.map((category)=><div>
                        {list.filter(item=>registeredTypes[item.type].menu?.category==category.identifier).map((blockType, index)=>
                            <>{index==0&&<div style={{padding: '5px 0px', color: '#4f4f4f', margin:'5px 10px' }}>{category.text}</div>}
                            <div key={index} className="moreblock" onClick={()=>props.onSelect(blockType.type)}>
                            <table style={{width:'100%'}}>
                                <tbody>
                                <tr><td style={{width: '28px'}}>{registeredTypes[blockType.type].menu?.icon}</td><td style={{textAlign:'left'}}>{blockType.name}</td></tr>                    
                                </tbody>
                            </table>
                        </div></>
                        )}
                    </div>)}
                    </div>
            
        </div>},
        {title:'Custom', element: <div>
                    {templates.map(template=>
                    <div className="moreblock">
                     <table style={{width:'100%'}}>
                     <tbody>
                    <tr onClick={()=>props.onSelect(template.tool, template.templateDef.identifier)}>
                        <td style={{width: '28px'}}>{template.templateDef.icon?template.templateDef.icon:getDef(template.tool).menu.icon}</td>
                        <td style={{textAlign:'left'}}>{template.templateDef.name}</td></tr>                                 
                        </tbody>
                    </table>
                    </div>
                    )}       
        </div>}
    ]} active={0} />       
    </div>)
    
}