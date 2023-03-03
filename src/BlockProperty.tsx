import React from "react";
import ReactDOM from 'react-dom';
import { getDef } from "./ToolDefinition";
import { PropertyGroup } from "./utils";

export const BlockProperty = (props:{blocktype: string, inBlock?:boolean, children?:React.ReactNode})=>{
    if (typeof window === 'undefined') {
      return <></>;
    }

    const propertyRoot = document.getElementById('dmeditor-property');
  
    return propertyRoot?ReactDOM.createPortal(
        (props.inBlock?
          <div>
            <PropertyGroup expandable={true} open={true} header={<b>{getDef(props.blocktype).name}</b>}>
              {props.children}
            </PropertyGroup>
            <div></div>
          </div>            
          :
          <div>{props.children}</div>
        ),
        propertyRoot as HTMLElement
      ):<></>
}