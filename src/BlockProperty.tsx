import React from "react";
import { useEffect } from "react";
import {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import { CommonSettings } from "./CommonSettings";
import { PropertyTab } from "./Tab";
import { Util } from './utils/Util';

export const BlockProperty = (props:{children?:React.ReactNode})=>{
    if (typeof window === 'undefined') {
      return <></>;
    }

    const propertyRoot = document.getElementById('dmeditor-property') as HTMLElement;
  
    return ReactDOM.createPortal(
        (   
          <div>
            {props.children}
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