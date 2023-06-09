import { TabOutlined,DeleteOutline,AddCircleOutlineOutlined,ArrowUpwardOutlined,ArrowDownwardOutlined, InsertEmoticon} from "@mui/icons-material";
import {blockTabCss} from "./BlockTab.css";
import React, {useEffect ,useState,useRef} from 'react';
import {BlockList} from '../../BlockList';
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { BlockProperty } from "../../BlockProperty"
import { CommonSettings } from '../../CommonSettings';
import { PropertyButton,Util } from "../../utils";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { StyleSettings } from "../../styles/StyleSettings";
import { getCommonBlockCss, getStyleCss } from "../../Block";
const nanoid = require('nanoid')


const BlockTab = (props:ToolRenderProps)=>{
    const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style||{});
    const [activeTabIndex, setActiveTabIndex] = useState(-1);
    const [key, setKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [tabList,setTabList] =  useState<Array<any>>(props.blockdata?.children||[]);
 
    const [isChange,setIsChange] = useState(false);
    const [styleIdentifier, setStyleIdentifier] = useState(props.blockdata.style);
    const tabRef:any=useRef(null);
    
    const onChange = (item:any,index:number)=>{
        let newList = [...tabList];
        newList[index]= item;
        setTabList(newList);
    }

    const changeTabName = (e:any,index:any)=>{
      let newTabList=[...tabList]
      const texts=e.target.innerText
      newTabList[index].data=texts;
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
        type:'list',id:'a'+nanoid(10),data:'', children:[
          {"type":"text", id:'a1', "data":[
            {type:"paragraph","children":[
                {"text":"Default text"}
            ], "setting":{}},
          ]
        }, 
        ]
      }
      setTabList([...newTabList,list])
    }
   
    const moveFun = (mode:string,index:any)=>{
      let tablist = [...tabList];
      let newActivekey=-1;
      if(mode==="up"){
         if(index==0)return;
        tablist[index] = tablist.splice(index-1, 1, tablist[index])[0]
        if(activeTabIndex>-1){
          if(index!=activeTabIndex){
            if(index-1==activeTabIndex){
              newActivekey=index
            }
          }else{
            newActivekey=index-1
          }
        }
       
      }else{
         if(index==tablist.length-1)return;
         tablist[index] = tablist.splice(index+1, 1, tablist[index])[0]
         if(activeTabIndex>-1){
          if(index!=activeTabIndex){
            if(index+1==activeTabIndex){
              newActivekey=index
            }
          }else{
            newActivekey=index+1
          }
          }
      }
      setTabList(tablist);
      if(newActivekey>-1){
        setActiveTabIndex(newActivekey);
        setKey(newActivekey)
        setTimeout(()=>{
          let ele:any=document.querySelectorAll('.tabName')[newActivekey]
          Util.poLastDiv(ele)
        },500)
      }
    }

    useEffect(()=>{
      const query = new URLSearchParams( location.search );
      const tabKey = query.get('_dme_tab'); //todo: use id
      if( tabKey ){
         setKey( parseInt( tabKey ) );
      }
      
    }, []);

    useEffect(()=>{
      props.onChange({...props.blockdata, style:styleIdentifier, children:tabList})
      setIsChange(false);
    }, [tabList,isChange])

    useEffect(() => {
      function handler(event: Event) {
        var elem=event.target  as any;
        while(elem){
          if(elem.className&&elem.classList.contains("tabDiv")){
            return;
          }
          elem=elem.parentNode;
        }
        setActiveTabIndex(-1)
      }
      window.addEventListener("click", handler);
      return () => window.removeEventListener("click", handler);
    }, []);

    // onDoubleClick
    return <>
    {props.active&&<BlockProperty blocktype="tab" inBlock={true}>
    <div className={getCommonBlockCss('tab', styleIdentifier)+ ' ' + blockTabCss() + ' tabDiv'} ref={tabRef} >
      {
        tabList.map((item:any,index:any)=>{
          return (
            <div className={`item ${ index === activeTabIndex? "active": "" }`}
            key={item.id}>
              <div 
                className="tabName" 
                onClick={(e:any)=>{
                    setActiveTabIndex(index)
                    setKey(index)
                  }
                } 
                onBlur={(e)=>{changeTabName(e,index)}} 
                suppressContentEditableWarning 
                contentEditable={true}>
                  {item.data}
              </div>
              <div className="btn-groups">
                <PropertyButton color="warning" title="move up"  style={index==0?{display:'none'}:{}}  onClick={()=>{moveFun('up',index)}}><ArrowUpwardOutlined /></PropertyButton>
                <PropertyButton color="warning" title="move down" style={index==tabList.length-1?{display:'none'}:{}} onClick={()=>{moveFun('down',index)}}><ArrowDownwardOutlined /></PropertyButton>
                <PropertyButton color="warning" title="Delete"  onClick={()=>{deletTab(index)}}><DeleteOutline /></PropertyButton>
              </div>
            </div>
          )
        })
      }
      <div className="item">
        <div></div>
        <div className="btn-groups"><PropertyButton color="warning" title="Add"  onClick={()=>{addTab()}}><AddCircleOutlineOutlined /></PropertyButton></div>
      </div>
      </div>
      <StyleSettings styleIdentifier={props.blockdata.style||''} blocktype='tab' onChange={(identifier:string)=>{setStyleIdentifier( identifier); setIsChange(true)}} />
      <div><CommonSettings commonSettings={commonSettings} settingList={['padding','backgroundColor','width']} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true);}} onDelete={props.onDelete}/></div>
    </BlockProperty>}
    <div style={...commonSettings}  className={getStyleCss('heading', styleIdentifier)}>  
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
                    <BlockList view={props.view} allowedType={['text', 'heading','image']} onChange={data=>onChange({...item, children:data},index)} active={props.active&&activeIndex==1} list={item.children}  onActivate={()=>setActiveIndex(1)}/>
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
          children:[ 
            {type:'list',id:'1',data:'Tab1', children:[
              {type:'heading', id:'1', data:'Tab1 Title', settings:{level: 2}},
              {"type":"text", id:'2', "data":[
                  {type:"paragraph","children":[
                      {"text":"Default text"}
                  ]},
                ]
              }, 
              ],
              "setting":{}
            },
            {type:'list',id:'2',data:'Tab2', children:[
              {type:'heading', id:'1', data:'Tab2 Title', settings:{level: 2}},
              {"type":"text", id:'2', "data":[
                  {type:"paragraph","children":[
                      {"text":"Default text"}
                  ]},
                ]
              }, 
              ],
              "setting":{}
            }           
          ]
        }
    },
    render:BlockTab    
}
