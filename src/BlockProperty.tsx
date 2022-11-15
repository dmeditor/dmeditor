import React from "react";
import { useEffect } from "react";
import {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import { CommonSettings } from "./CommonSettings";
import { PropertyTab } from "./Tab";

export const BlockProperty = (props:{title:string, active:boolean, children?:React.ReactNode})=>{
    const propertyRoot = document.getElementById('dmeditor-property') as HTMLElement;

    if(!props.active){
        return <></>;
    }
  
    return ReactDOM.createPortal(
        (   
          <div>
             <PropertyTab 
                active={0}
                tabs={[
                     {title: props.title, element:
                      <div style={{marginBottom:'100px'}}>{props.children}</div>
                   },
                    {title:'Document', element:<div>
                    Meta keywords: <br />
                    Meta description:
                </div>},                             
              ]} />

            </div>            
        ),
        propertyRoot
      )    
}

// export class BlockProperty extends PureComponent<{children:any, active:boolean, title:string},{}>{
//   containerEl:any;
//   propertyRoot = document.getElementById('dmeditor-property') as HTMLElement;

//   constructor(props:any) {
//     super(props);
//     this.containerEl = null;
//   }

//   componentDidMount() {
//     this.containerEl = document.createElement('div');
//     // this.propertyRoot.append( this.containerEl);
//   }

//   componentWillUnmount() {
//     this.propertyRoot.removeChild(this.containerEl);
//   }

//   render() {
//     if (!this.containerEl) {
//       return null;
//     } 
//     return ReactDOM.createPortal(this.props.children,this.containerEl);  
//   }
// }