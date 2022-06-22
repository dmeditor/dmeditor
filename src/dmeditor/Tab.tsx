import { LaptopMacOutlined, MobileScreenShareOutlined, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { Box, Tabs, Tab } from '@mui/material';
import { ReactElement, useState } from 'react';
import './Tab.css';
import { Input } from './utils/Input';
import { Ranger } from './utils/Ranger';

interface TabData{
    text: string,
    content: ReactElement
}

export const DMTab = (props:{tabs:Array<TabData>, active?: number})=>{
    const [active, setActive] = useState(props.active?props.active:0);


    // const tabs = [
    //     {text:'Element', content: <div>
    //                 <label>Active</label>
    //                 <div>
                        
    //                 </div>
    //         </div> },
    //         {text:'Block', 
    //                 content: <div>{props.content}</div>}                    
    //             ]


    return (<div>
        <div className='tab-header-container'>  
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={(e:any, newValue:number)=>setActive(newValue)}>
                {props.tabs.map((tab:TabData, index:number)=><Tab style={{textTransform:'none'}} className={index===active?'active':''} value={index} label={tab.text} />)}
            </Tabs>    
            </Box>
        </div>
        {props.tabs.map((tab:TabData, index:number)=>
            {return active==index?<div className="tab-content">{tab.content}</div>:''})}
    </div>)
}