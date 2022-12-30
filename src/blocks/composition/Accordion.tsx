import { ViewListOutlined,DeleteOutline,AddCircleOutlineOutlined} from "@mui/icons-material";
import "./BlockTab.css";
import React, {useEffect ,useState,useRef} from 'react';
import {BlockList} from '../../BlockList';
import { ToolDefinition, ToolRenderProps } from "../../ToolDefinition";
import { BlockProperty } from "../../BlockProperty"
import { CommonSettings } from '../../CommonSettings';
import {PropertyGroup,  PropertyItem,PropertyButton } from "../../utils/Property";
import Accordion from 'react-bootstrap/Accordion';
import { nanoid } from "nanoid";


const BlockAccordion = (props:ToolRenderProps)=>{
    const [commonSettings, setCommonSettings] = useState(props.data.common);
    const [activeTabIndex, setActiveTabIndex] = useState(-1);
    const [key, setKey] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [accordionList,setAccordionList] =  useState<Array<any>>(()=>{
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
    const expandableItemRef:any=useRef(null);
    
    const onChange = (item:any,data:any, index:number)=>{
      let newAccordionList=[...accordionList]
      newAccordionList[index]= item;
      setAccordionList(newAccordionList);
    }

    const changeAccordionName = (e:any,index:any)=>{
      let newAccordionList=[...accordionList]
      newAccordionList[index].contentEditable=false;
      const texts=e.target.innerText
      newAccordionList[index].data=texts;
      setActiveTabIndex(-1);
      setKey(index)
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
        type:'list',id:nanoid(),data:'', children:[
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
   

    useEffect(()=>{
        props.onChange({...props.data, children:accordionList})
        setIsChange(false);
    }, [accordionList,isChange])

  
    return <>
    {props.active&&<BlockProperty  blocktype="accordion" inBlock={true}>
      {
        accordionList.map((item,index)=>{
          return (
            <div className={`item ${ index === activeTabIndex? "active": "" }`}
            key={item.id}>
              <div ref={expandableItemRef} 
                className="tabName" 
                onDoubleClick={()=>{
                    let newAccordionList=[...accordionList];
                    newAccordionList[index].contentEditable=true;
                    setAccordionList([...newAccordionList])
                    setActiveTabIndex(index)
                  }
                } 
                onBlur={(e)=>{changeAccordionName(e,index)}} 
                suppressContentEditableWarning 
                contentEditable={item.contentEditable}>
                  {item.data}
              </div>
              <div><PropertyButton color="warning" title="Delete"  onClick={()=>{deletAccordion(index)}}><DeleteOutline /></PropertyButton></div>
            </div>
          )
        })
      }
      <div className="item">
        <div></div>
        <div><PropertyButton color="warning" title="Add"  onClick={()=>{addAccordion()}}><AddCircleOutlineOutlined /></PropertyButton></div>
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
                  <BlockList allowedType={['text', 'heading','image']} onChange={data=>onChange(item,data,index)} active={props.active&&activeIndex==1} list={item.children}  onActivate={()=>setActiveIndex(1)}/>
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
              {type:'heading', id:'1', data:'Title Heading', common:{color: '#ff0000'}, settings:{level: 2}},
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
    view: (props:{data:any})=><BlockAccordion data={props.data} active={false} onChange={()=>{}} inBlock={false} />,
    render:BlockAccordion    
}
