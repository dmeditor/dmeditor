import React from "react";
import { useEffect } from "react";
import {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import { CommonSettings } from "./CommonSettings";
import { PropertyTab } from "./Tab";
import { Util } from './utils/Util';

export const BlockProperty = (props:{title:string, active:boolean, children?:React.ReactNode})=>{
    if (typeof window === 'undefined') {
      return <></>;
    }

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
                    {title:'Page', element:<div>
                     {Util.renderPageTab()}
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