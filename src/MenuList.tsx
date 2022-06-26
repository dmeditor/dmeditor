import { Input } from '@mui/material';
import { useState } from 'react';
import { blockManager } from './BlockManager';
import './MenuList.css';

export const MenuList = (props:{onSelect:any})=>{
    const blockCategory = [
        {identifier: 'basic', text: 'Basic'},
        {identifier: 'content_block', text: 'Content'},
        {identifier: 'pre_designed', text: 'Pre designed'},        
        {identifier: 'util', text: 'Utility'},
        {identifier: 'superoffice', text: 'SuperOffice'},
        {identifier: 'social_network', text: 'Social Network'}        
        ];

    const registeredTypes = blockManager.getBlockTypes();    

    let names: Array<{type: string, name: string}> = [];
    for( let item of Object.keys( registeredTypes ) ){
        const blockType = registeredTypes[item];
        names = [...names, {type: item, name: blockType.menu.text}];
    }

    const [list, setList] = useState(names);

    const search = (e:any)=>{
        let input = e.target.value.toLowerCase();
        let list = names.filter((item)=>item.name.toLowerCase().includes(input))
        setList(list);
    };

    return (<div style={{background: 'white'}}>
        <div style={{fontSize:'20px', padding: '10px 4px'}}>Please choose a block type</div>
        <div style={{background:'white'}}>
        <Input fullWidth placeholder='Type to search' onChange={search} autoFocus style={{padding: '10px'}} />
        </div>
        {blockCategory.map((category)=><div>
            {list.filter(item=>registeredTypes[item.type].menu.category==category.identifier).map((blockType, index)=>
                <>{index==0&&<div style={{padding: '5px 0px', color: '#4f4f4f', margin:'5px 10px' }}>{category.text}</div>}
                <div key={index} className="moreblock" onClick={()=>props.onSelect(blockType.type)}>
                <table style={{width:'100%'}}>
                    <tr><td style={{width: '28px'}}>{registeredTypes[blockType.type].menu.icon}</td><td style={{textAlign:'left'}}>{blockType.name}</td></tr>                    
                </table>
            </div></>
            )}
        </div>)}
    </div>)
    
}