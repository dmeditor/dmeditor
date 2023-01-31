import { TabOutlined,DeleteOutline,AddCircleOutlineOutlined} from "@mui/icons-material";
import {blockTabCss} from "./BlockTab.css";
import React, {useEffect ,useState,useRef} from 'react';
import {BlockList} from '../../BlockList';
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { BlockProperty } from "../../BlockProperty"
import { CommonSettings } from '../../CommonSettings';
import {PropertyGroup,  PropertyItem,PropertyButton } from "../../utils/Property";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { nanoid } from "nanoid";


const BlockTab = (props:ToolRenderProps)=>{
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const [activeTabIndex, setActiveTabIndex] = useState(-1);
    const [key, setKey] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabList,setTabList] =  useState<Array<any>>(()=>{
      if(props.data.children){
        return props.data.children.map(item=>{
          return {
            ...item,
            ...{contentEditable:false}
          }
        })
      }else{
        return []
      }
    });
    const [isChange,setIsChange] = useState(false);
    const tabRef:any=useRef(null);
    
    const onChange = (item:any,data:any, index:number)=>{
        let newList = [...tabList];
        newList[index]= item;
        setTabList(newList);
    }

    const changeTabName = (e:any,index:any)=>{
      let newTabList=[...tabList]
      newTabList[index].contentEditable=false;
      const texts=e.target.innerText
      newTabList[index].data=texts;
      setActiveTabIndex(-1);
      setKey(index)
      setTabList([...newTabList])
    }

    const deletTab = (index:any)=>{
      let newTabList=[...tabList]
      newTabList.splice(index,1)
      setActiveTabIndex(-1);
      setTabList([...newTabList])
      if( newTabList.length===0 ){
        setKey(-1);
      }else{
        if(key==0){
          setKey(0);
        }else{
          if(index<=key){
            setKey(key-1);
          }

          
        }
      }
    }
    
    const addTab = ()=>{
      let newTabList=[...tabList]
      let list={
        type:'list',id:nanoid(),data:'', children:[
          {"type":"text", id:nanoid(), "data":[
            {type:"paragraph","children":[
                {"text":"Default text"}
            ],"common":{}, "setting":{}},
          ]
        }, 
        ]
      }
      setTabList([...newTabList,list])
    }
   

    useEffect(()=>{
        props.onChange({...props.data, children:tabList})
        setIsChange(false);
    }, [tabList,isChange])

  
    return <>
    {props.active&&<BlockProperty blocktype="tab" inBlock={true}>
    <div className={blockTabCss}>
      {
        tabList.map((item,index)=>{
          return (
            <div className={`item ${ index === activeTabIndex? "active": "" }`}
            key={item.id}>
              <div ref={tabRef} 
                className="tabName" 
                onDoubleClick={()=>{
                    let newTabList=[...tabList];
                    newTabList[index].contentEditable=true;
                    setTabList([...newTabList])
                    setActiveTabIndex(index)
                  }
                } 
                onBlur={(e)=>{changeTabName(e,index)}} 
                suppressContentEditableWarning 
                contentEditable={item.contentEditable}>
                  {item.data}
              </div>
              <div><PropertyButton color="warning" title="Delete"  onClick={()=>{deletTab(index)}}><DeleteOutline /></PropertyButton></div>
            </div>
          )
        })
      }
      <div className="item">
        <div></div>
        <div><PropertyButton color="warning" title="Add"  onClick={()=>{addTab()}}><AddCircleOutlineOutlined /></PropertyButton></div>
      </div>
      </div>
      <div><CommonSettings commonSettings={commonSettings} settingList={['padding','backgroundColor','width']} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true);}} /></div>
    </BlockProperty>}
    <div style={...commonSettings}>  
         <Tabs
          className="blockTab"
          activeKey={key}
          onSelect={(k:any) => {setKey(k);setActiveIndex(0);setActiveTabIndex(-1);}}
        >

          {
            tabList.map((item,index)=>{
              return (
                <Tab  key={item.id} eventKey={index} title={item.data}>
                  <div>
                    <BlockList allowedType={['text', 'heading','image']} onChange={data=>onChange(item,data,index)} active={props.active&&activeIndex==1} list={item.children}  onActivate={()=>setActiveIndex(1)}/>
                  </div>
                </Tab>
              )
            })
          }
        </Tabs>
    </div>
    </>
}

export const toolBlockTab: ToolDefinition = {
    type: 'tab',
    isComposited: true,
    name:"Tab",
    menu:  {category:'blocks',icon: <TabOutlined /> },
    initData: ()=>{
        return {
          type:'tab',
          settings:{childrenHorizontal: false},
          data:'',
          common:{},
          children:[ 
            {type:'list',id:'1',data:'Tab1', children:[
              {type:'heading', id:'1', data:'Tab1 Title', common:{color: '#ff0000'}, settings:{level: 2}},
              {"type":"text", id:'2', "data":[
                  {type:"paragraph","children":[
                      {"text":"Default text"}
                  ]},
                ]
              }, 
              ],
              "common":{}, "setting":{}
            },
            {type:'list',id:'2',data:'Tab2', children:[
              {type:'heading', id:'1', data:'Tab2 Title', common:{color: '#ff0000'}, settings:{level: 2}},
              {"type":"text", id:'2', "data":[
                  {type:"paragraph","children":[
                      {"text":"Default text"}
                  ]},
                ]
              }, 
              ],
              "common":{}, "setting":{}
            }
          ]
        }
    },
    view: (props:{data:any})=><BlockTab data={props.data} active={false} onChange={()=>{}} inBlock={false} />,
    render:BlockTab    
}
