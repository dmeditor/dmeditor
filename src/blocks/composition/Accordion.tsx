import { ViewListOutlined,DeleteOutline,AddCircleOutlineOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined} from "@mui/icons-material";
import {blockTabCss} from "./BlockTab.css";
import React, {useEffect ,useState,useRef} from 'react';
import {BlockList} from '../../BlockList';
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { BlockProperty } from "../../BlockProperty"
import { CommonSettings } from '../../CommonSettings';
import {PropertyButton, Util } from "../../utils";
import Accordion from 'react-bootstrap/Accordion';
const nanoid = require('nanoid')


const BlockAccordion = (props:ToolRenderProps)=>{
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const [activeTabIndex, setActiveTabIndex] = useState(-1);
    const [key, setKey] = useState(0);
   const [activeIndex, setActiveIndex] = useState(0);
   const [accordionList,setAccordionList] =  useState<Array<any>>(props.data?.children||[]);
    
    const [isChange,setIsChange] = useState(false);
    const expandableItemRef:any=useRef(null);
    
    const onChange = (item:any,index:number)=>{
      let newAccordionList=[...accordionList]
      newAccordionList[index]= item;
      setAccordionList(newAccordionList);
    }

    const changeAccordionName = (e:any,index:any)=>{
      let newAccordionList=[...accordionList]
      // newAccordionList[index].contentEditable=false;
      const texts=e.target.innerText
      newAccordionList[index].data=texts;
      // setActiveTabIndex(-1);
      // setKey(index)
      setAccordionList([...newAccordionList])
    }

    const deletAccordion  = (index:any)=>{
      let newAccordionList=[...accordionList]
      newAccordionList.splice(index,1)
      setActiveTabIndex(-1);
      setAccordionList([...newAccordionList])
      if( newAccordionList.length===0 ){
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
    
    const addAccordion = ()=>{
      let newAccordionList=[...accordionList]
      let list={
        type:'list',id:'a'+nanoid(10),data:'', children:[
          {"type":"text", id:nanoid(), "data":[
            {type:"paragraph","children":[
                {"text":"Default text"}
            ],"common":{}, "setting":{}},
          ]
        }, 
        ]
      }
      setAccordionList([...newAccordionList,list])
    }
   
   const moveFun = (mode:string,index:any)=>{
      let newAccordionList=[...accordionList]
      let newActivekey=-1;
      if(mode==="up"){
         if(index==0)return;
        newAccordionList[index] = newAccordionList.splice(index-1, 1, newAccordionList[index])[0]
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
         if(index==newAccordionList.length-1)return;
         newAccordionList[index] = newAccordionList.splice(index+1, 1, newAccordionList[index])[0]
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
      setAccordionList(newAccordionList);
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
        props.onChange({...props.data, children:accordionList})
        setIsChange(false);
    }, [accordionList,isChange])

  
    return <>
    {props.active&&<BlockProperty  blocktype="accordion" inBlock={true}>
    <div className={blockTabCss()}>
      {
        accordionList.map((item,index)=>{
          return (
            <div className={`item ${ index === activeTabIndex? "active": "" }`}
            key={item.id}>
              <div ref={expandableItemRef} 
                className="tabName" 
                onClick={()=>{
                    setActiveTabIndex(index)
                    setKey(index)
                  }
                } 
                onBlur={(e)=>{changeAccordionName(e,index)}} 
                suppressContentEditableWarning 
                contentEditable={true}>
                  {item.data}
              </div>
              <div className="btn-groups">
                <PropertyButton color="warning" title="move up"  style={index==0?{display:'none'}:{}}  onClick={()=>{moveFun('up',index)}}><ArrowUpwardOutlined /></PropertyButton>
                <PropertyButton color="warning" title="move down" style={index==accordionList.length-1?{display:'none'}:{}} onClick={()=>{moveFun('down',index)}}><ArrowDownwardOutlined /></PropertyButton>
                <PropertyButton color="warning" title="Delete" onClick={() => { deletAccordion(index) }}><DeleteOutline /></PropertyButton>
              </div>
            </div>
          )
        })
      }
      <div className="item">
        <div></div>
        <div className="btn-groups"><PropertyButton color="warning" title="Add"  onClick={()=>{addAccordion()}}><AddCircleOutlineOutlined /></PropertyButton></div>
      </div>
      </div>
      <div><CommonSettings commonSettings={commonSettings} settingList={['padding','backgroundColor','width']} onChange={(settings)=>{setCommonSettings(settings);setIsChange(true);}} /></div>
    </BlockProperty>}
    <div style={...commonSettings}>  
      <Accordion className="expandableList" defaultActiveKey="0">
        {
          accordionList.map((item,index)=>{
            return (
              <Accordion.Item  key={item.id} eventKey={`'${index}'`}>
                <Accordion.Header>{item.data}</Accordion.Header>
                <Accordion.Body>
                  <BlockList view={props.view} allowedType={['text', 'heading','image']} onChange={data=>onChange({...item,children:data},index)} active={props.active&&activeIndex==1} list={item.children}  onActivate={()=>setActiveIndex(1)}/>
                </Accordion.Body>
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </div>
    </>
}

export const toolAccordion: ToolDefinition = {
    type: "accordion",
    name:"Accordion",
    isComposited: true,
    menu:  {category:'blocks',icon: <ViewListOutlined /> },
    initData: ()=>{
        return {
          type:'accordion',
          settings:{childrenHorizontal: false},
          data:'',
          common:{},
          children:[ 
            {type:'list',id:'1',data:'Title', children:[
              {type:'heading', id:'1', data:'Title Heading', common:{}, settings:{level: 2}},
              {"type":"text", id:'2', "data":[
                  {type:"paragraph","children":[
                      {"text":"Default text"}
                  ]},
                 
                ]
              }, 
              ],
              "common":{}, "setting":{}
            },
            
          ]
        }
    },
    view: (props:{data:any})=><BlockAccordion view={true} data={props.data} active={false} onChange={()=>{}} inBlock={false} />,
    render:BlockAccordion    
}
