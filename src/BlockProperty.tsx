import React, { useEffect, useState } from "react";
import ReactDOM, { createPortal } from 'react-dom';
import { getDef } from "./ToolDefinition";
import { PropertyGroup } from "./utils";
import { PropertyTab } from "./Tab";

declare global {
  interface Window {
    dmeditorPropertyTab: (params: any) => void;
  }
}

window.dmeditorPropertyTab = (e:any)=>{
  var  i= 0;
  var elem = e.currentTarget;
  while((elem=elem.previousSibling)!=null) ++i;

  var tabContainer = document.getElementById('dmeditor-property')?.children[0] as any;
  for(var index = 0; index< tabContainer.children.length; index++){
      var ele = tabContainer.children.item(index);
      if( index == i ){
        ele.classList.remove( 'normal' );
        ele.classList.add( 'current' );
      }else{
        ele.classList.remove( 'current' );
        ele.classList.add( 'normal' );
      }
  }

  var body = document.getElementById('dmeditor-property')?.children[1] as any;
  for(var index = 0; index< body.children.length; index++){
      var ele = body.children.item(index);
      if( index == i ){
        ele.style.display = 'block';
      }else{
        ele.style.display = 'none';
      }
  }
}

//todo: use one instance so it can put multi to multi tabs.
export const BlockProperty = (props:{blocktype: string, inBlock?:boolean, children?:React.ReactNode})=>{
    if (typeof window === 'undefined') {
      return <></>;
    }

    const propertyRoot = document.getElementById('dmeditor-property');
  
    const tabClick = (e:any)=>{
      window.dmeditorPropertyTab(e)
        // ?window.dmeditorTab(e):
    }

    return propertyRoot?<>{createPortal(      
      <div className="tab-header" onClick={tabClick}><button className="btn">{getDef(props.blocktype).name}</button></div>
      , 
        propertyRoot.children[0] as HTMLElement
    )}
    {createPortal(<div className="tab-body">{props.children}</div>, 
    propertyRoot.children[1] as HTMLElement
  )}</>:<></>
}

