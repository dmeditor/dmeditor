import { LaptopMacOutlined, MobileScreenShareOutlined, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { Box, Tabs, Tab } from '@mui/material';
import { ReactElement, useState } from 'react';
import './Tab.css';


export const DMTab = (props:{content:ReactElement})=>{
    const [active, setActive] = useState(0);

    const tabs = [{text:'Block', 
    content: props.content},
                    {text:'Page', content: <div>
                    <label>Page settings</label>
                    <div>
                        <table style={{width: '100%'}}>
                            <tr>
                                <td>Width</td>
                                <td><LaptopMacOutlined /> <TabletMacOutlined /><PhoneIphoneOutlined /> </td>
                            </tr>
                        </table>
                    </div>
            </div> }
                ]


    return (<div style={{height:'100vh', background:'#fcfcfc'}}>
        <div className='tab-header-container'>  
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={(e:any, newValue:number)=>setActive(newValue)}>
                {tabs.map((tab, index)=><Tab style={{textTransform:'none'}} className={index===active?'active':''} value={index} label={tab.text} />)}
            </Tabs>    
            </Box>
        </div>
        {tabs.map((tab, index)=>
            {return active==index?<div className="tab-content">{tab.content}</div>:''})}
    </div>)
}