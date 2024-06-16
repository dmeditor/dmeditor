/**
 * 
 * 
 * Use in DM Editor:
 * 
 import { defaultStyles } from './defaultStyles';

 for (const widget of Object.keys(defaultStyles)) {
    registerWidgetStyleOption(widget, [defaultStyles[widget]]);
 }
 */

export const defaultStyles = {
    'tabs':{
            identifier:'_default', 
            name:'Default',
            cssStyle:`
            div[role='tablist']{
                border-bottom: 1px solid #cccccc;
                padding-left: 10px;

                 .dme-w-nav-item{
                  padding: 10px 15px;
                  border: none;
                  cursor: pointer;
                  background: white;
                  font-size: 1rem;
                }

                .dme-w-nav-item:hover{
                    font-weight: bold;
                }

                .dme-w-nav-item.dme-w-active{
                    border-top: 1px solid #cccccc;
                    border-left: 1px solid #cccccc;
                    border-right: 1px solid #cccccc;
                    border-bottom: 1px solid white;
                    margin-bottom: -1px;
                    border-radius: 4px 4px 0px 0px;
                }

            }            

            `
        }
    }