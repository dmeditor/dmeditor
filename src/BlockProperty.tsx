import React from "react";
import { useEffect } from "react";
import {PureComponent} from 'react';
import ReactDOM from 'react-dom';

export const BlockProperty = (props:any)=>{
    const propertyRoot = document.getElementById('dmeditor-property') as HTMLElement;

    if(!props.active){
        return <></>;
    }
  

    return ReactDOM.createPortal(
        (
          <div>
            <div style={{border: '1px solid #cccccc'}}> 
            <div style={{background:'#dddddd', padding: 5}}>{props.title}</div>
                <div style={{padding: '5px 10px'}}>{props.children}</div>
            </div>            
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