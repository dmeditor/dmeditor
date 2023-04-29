import { css } from "@emotion/css";
import { registerTemplate } from "../ToolDefinition";
import { toolHeading } from "../blocks/Heading";
import { toolImageText } from "../blocks/composition/ImageText";


export const initTemplates = ()=>{
//templates
registerTemplate({ blocktype: 'heading', identifier:'gradient', 
    name:'Gradient', 
    initData: ()=>{
      const data = toolHeading.initData();
      return {...data, data:'Hello', common:{...data.common, textAlign:'center' }}
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
registerTemplate( {  blocktype:'imagetext', identifier:'loose', name:'Loose image text', 
    initData: ()=>{
      const data = toolImageText.initData();
      return {...data, common:{...data.common, color: '#ffffff', backgroundColor: '#133e48'}}; 
    },
    css: css` 
        padding: 20px 30px;
    `,
    icon:toolImageText.menu.icon }
    );

//global
if( (typeof window !== "undefined") && (window as any).dmeditor ){
  let templates = (window as any).dmeditor.templates;
  if(templates){
    for( const template of templates ){
      registerTemplate(template)
    }
  }
}

}