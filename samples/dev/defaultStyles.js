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
            enabledStyleSettings:["container-background-color"],      
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
    'menu':{
        cssClasses:{
            'container':'dme-w-container',
            'menuitem':'dme-w-menuitem',
            'current':'dme-w-current',                          
        },
        cssStyle:`
                .dme-w-container{
                    padding: 10px;
                }
                
                .dme-w-menuitem{
                    padding: 5px;
                    display: inline-block;
                }

                .dme-w-current{
                    font-weight:bold;
                }
            `
    },
    'form-field':{
        cssStyle:`
            input{
                padding: 8px;
                border-radius: 3px;
                border:1px solid #cccccc;
            }

            .dme-w-error{
               background:rgb(255, 243, 243);
               border-radius: 4px;
            }

            .dme-w-error-message{
                color: red;
                padding: 10px;
            }
        `           

    },
    'carousel':{
    cssStyle:`           
       .dme-w-arrow-button{
            margin: 10px;
            padding: 10px;
            border-radius: 50%;
            color: white;
            background: rgba(0,0,0,0.4);
            
            & > svg{
               font-size: 28px;
            }
  
            &:hover{
              opacity: 0.8;
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

            .dme-w-caption{
                padding: 8px;
            }

            .dme-w-popup-caption{
                padding: 20px;
                font-size: 20px;
            }

            .dme-w-pagination-item-current{
              font-weight: bold;
            }            
        `
    }
    }