/**
 * 
 * 
 * Use in DM Editor:
 * 
 import { defaultStyles } from './defaultStyles';

 const defaultStyleConfig = {}
 for (const widget of Object.keys(defaultStyles)) {
    registerWidgetStyleOption(widget, [
      { identifier: '_default', name: 'Default', ...defaultStyles[widget] },
    ]);
    defaultStyleConfig[widget] = {_:'_default'}
 }


setDMEditorConfig({
 //other config
 editor: {   
    defaultStyle: {      
      ...defaultStyleConfig
    }
}
)
 */

export const defaultStyles = {
    'tabs':{            
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
        },
    'collapsable-text':{
        cssStyle:`
             .dme-w-button-container{
                // display: flex;
                // align-items: center;
                // justify-content: center;
            }

            .dme-w-button{
                padding: 10px 15px;
                border: none;
                cursor: pointer;
                background: white;
                font-size: 1rem;
            }
            .dme-w-button:hover{
                background: #f0f0f0;
            }
        `
    },
    'gallery':{
        cssStyle:`           
            .dme-w-pagination-item{
              padding: 5px;
            }

            .dme-w-indicator{
                font-size: 14px;
                color: white;
                text-shadow: 1px 1px 1px #333333;
            }

            .dme-w-pagination-item-current{
              font-weight: bold;
            }            
        `
    }
    }