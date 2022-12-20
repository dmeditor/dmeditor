import { nanoid } from "nanoid";

export interface ToolRenderProps {
    data: {data:any, id:string, template?:string, settings?:any, common?:any, source?:any,[propName:string]:any, children?:Array<any> }, 
    active:boolean,
    adding?:boolean, 
    options?: any,
    onChange:(data:any, debounce?:boolean)=>void,
    onCancel?:()=>void,
    inBlock:boolean
} 


export interface TemplateDefinition{
    blocktype: string,
    identifier: string,
    name: string,
    icon?: React.ReactElement,
    initData:()=>any,
    css?:string,   //customized css
    options?: {[setting:string]:any} //customization
}

export interface ToolDefinition {
    type:string,
    isComposited?: boolean,
    templates?: {[identifier: string]:TemplateDefinition},
    name: string,
    menu: {category: string, icon: React.ReactElement},
    initData: ()=>any,
    onServerLoad?: (data:any)=>Promise<any>, //invoked in server side before loading
    view:(props:{data:any})=>React.ReactElement
    render: (props:ToolRenderProps)=>React.ReactElement,
}

let defMap: {[key: string]: ToolDefinition} = {};

export const getToolDefinitions = () => {
    return defMap;
};

export const registerTool = (toolDef:ToolDefinition)=>{
    defMap[toolDef.type] = toolDef;
}

export const getDef = (type:string):ToolDefinition=>{
    return defMap[type];
}

export const registerTemplate = (template:TemplateDefinition)=>{
    const tool = template.blocktype;
    const def = getDef(tool);
    if(!def){
        console.log("Tool not found: "+ tool);
    }else{
        if( !def.templates ){
            let newTemplates = {} as {[identifier: string]:TemplateDefinition};
            newTemplates[template.identifier] = template;
            def.templates = newTemplates;
        }else{
            def.templates[template.identifier] = template;
        }
    }
}

const toolCategories = [
    {identifier: 'basic', text: 'Basic'},
    {identifier: 'blocks', text: 'Blocks'},
    {identifier: 'content', text: 'Content'},
    {identifier: 'form', text: 'Form'},        
    {identifier: 'social_network', text: 'Social Network'}        
    ];

export const getCategories = () => {
    return toolCategories;
};

export const getAllTemplates = ()=>{
    let result:Array<{tool: string, templateDef:TemplateDefinition}> = [];
    for(const tool of Object.keys(defMap)){
        const templates = defMap[tool].templates;
        if( templates ){
            for( const template of Object.keys(templates) ){
                result = [...result, {tool: tool, templateDef: templates[template]} ];
            }
        }
    }
    return result;
}

export const registerCategory = (category:{identifier:string, text: string})=>{
    toolCategories.push(category);
}

export const newBlockData = (type:string, template?:string)=>{
    var defaultData;
    const def = getDef(type);
    if( template ){
      if( def.templates && def.templates[template] ){
        defaultData = def.templates[template].initData();
        defaultData.template = template;
      }else{
        throw "template "+template+ " not found";
      }
    }else{
      //todo: optimize this to clone or initData()
      defaultData = def.initData();
    }

    defaultData.id = nanoid();   
    return defaultData;
}