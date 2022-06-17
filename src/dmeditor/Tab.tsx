import { ReactElement, useState } from 'react';
import './Tab.css';



export const Tab = (props:{content:ReactElement})=>{
    const [active, setActive] = useState(0);

    const tabs = [{text:'Block settings', 
    content: props.content},
                    {text:'Tab2', content: <div>
                    <label>Layout</label>
                                <hr />
        
            </div> }
                ]


    return (<div style={{height:'100vh'}}>
        <div className='tab-header-container'>
        {tabs.map((tab, index)=><div onClick={()=>setActive(index)} className={((index==active)?'active ':'')+'tab-header'}>{tab.text}</div>)}
        </div>
        <div>
        {tabs.map((tab, index)=><div className='tab-content'>{index==active&&<>{tab.content}</>}</div>)}
        </div>
    </div>)
}