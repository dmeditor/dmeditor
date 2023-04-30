import { css } from "@emotion/css";
import { registerTemplate } from "../ToolDefinition";
import { toolHeading } from "../blocks/Heading";
import { toolImageText } from "../blocks/composition/ImageText";


export const initTemplates = ()=>{
//templates
registerTemplate({ blocktype: 'heading', identifier:'gradient', 
    name:'Gradient', 
    getData: (data)=>{
      return {...data, common:{...data.common, textAlign:'center' }}
    }, 
    css: css`
       h1, h2, h3, h4, h5{
        background-image: linear-gradient(45deg, #2c00ff, #ff009b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
      }
    `,
    icon:toolHeading.menu.icon });
registerTemplate( {  blocktype:'imagetext', identifier:'loose', name:'Loose', 
    getData: (data)=>{
      return {...data, common:{...data.common, color: '#ffffff', backgroundColor: '#133e48'}}; 
    },
    css: css` 
        padding: 20px 30px;
        .dme-imagetext-container > div:first-child .dme-blocklist{
           padding-right: 10px;
        }
        .dme-imagetext-container > div:last-child .dme-blocklist{
          padding-left: 10px;
       }

       .dmeditor-view-mobile & .dme-blocklist{
          padding: 0px !important;
       }
    `,
    icon:toolImageText.menu.icon }
    );

//global
if( (typeof window !== "undefined") && (window as any).dmeditor ){
  let templates = (window as any).dmeditor.templates;
  if(templates){
    for( let template of templates ){
      template.css = css(template.css); //generate css
      registerTemplate(template)
    }
  }
}

}