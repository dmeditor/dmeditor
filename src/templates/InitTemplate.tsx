import { css } from "@emotion/css";
import { registerTemplate } from "../ToolDefinition";


export const initTemplates = ()=>{
//templates
registerTemplate(
    { blocktype: 'container_list', 
    id:'heading_text', 
    name:'Heading text',  
    data:{
        type: 'container_list',
        children: [
            {type:'image', 
            data:{url:'https://cdn.jsdelivr.net/gh/dmeditor/templates@main/forsythia_1280.jpg'}},
            {type:'heading', 
            settings:{level:2},
            data:'Heading'},
            {"type":"text", id:'a2', "data":[
                {type:"paragraph","children":[
                    {"text":"Default text 1"}
                ]},           
              ]
            }]          
        }
     },
     );

registerTemplate(
        { blocktype: 'container_grid', 
        id:'heading_text', 
        name:'Heading text grid',  
        data:{
            type: 'container_grid',
            settings:{columns:2},
            template: 'space-small',
            children: [
                {
                    type: 'container_list',
                    children: [
                        {type:'image', 
                        data:{url:'https://cdn.jsdelivr.net/gh/dmeditor/templates@main/forsythia_1280.jpg'}},
                        {type:'heading', 
                        settings:{level:2},
                        data:'Heading'},
                        {"type":"text", id:'a2', "data":[
                            {type:"paragraph","children":[
                                {"text":"Default text 1"}
                            ]},           
                          ]
                        }]          
                    },
                    {
                        type: 'container_list',
                        children: [
                            {type:'image', 
                            data:{url:'https://cdn.jsdelivr.net/gh/dmeditor/templates@main/forsythia_1280.jpg'}},
                            {type:'heading', 
                            settings:{level:2},
                            data:'Heading'},
                            {"type":"text", id:'a2', "data":[
                                {type:"paragraph","children":[
                                    {"text":"Default text 1"}
                                ]},           
                              ]
                            }]          
                        },
                    {
                        type: 'container_list',
                        children: [
                            {type:'image', 
                            data:{url:'https://cdn.jsdelivr.net/gh/dmeditor/templates@main/forsythia_1280.jpg'}},
                            {type:'heading', 
                            settings:{level:2},
                            data:'Heading'},
                            {"type":"text", id:'a2', "data":[
                                {type:"paragraph","children":[
                                    {"text":"Default text 1"}
                                ]},           
                                ]
                            }]          
                        }
            ]          
            }
            },
            );

//global
if( (typeof window !== "undefined") && (window as any).dmeditor ){
  let templates = (window as any).dmeditor.templates;
  if(templates){
    for( let template of templates ){
      registerTemplate(template)
    }
  }
}

}