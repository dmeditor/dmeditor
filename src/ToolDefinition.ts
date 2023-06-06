const nanoid = require('nanoid')

export interface ToolRenderProps {
    data: {data:any, id:string, style?:string, settings?:any, common?:any, source?:any,[propName:string]:any, children?:Array<any> }, 
    active:boolean,
    adding?:boolean, 
    options?: any,
    view?:boolean,
    onChange:(data:any, debounce?:boolean)=>void,
    onCancel?:()=>void,
    inBlock?:boolean,
    onDelete?:()=>void
} 


export interface StyleDefinition{
    blocktype: string,
    identifier: string,
    name: string,
    icon?: React.ReactElement,    
    css?:string,   //customized css
    options?: {[setting:string]:any} //customization
}

export interface TemplateDefinition{
    name: string,
    blocktype: string,
    id: string,
    data: any
}

export interface ToolDefinition {
    type:string,
    isComposited?: boolean,
    templates?: {[identifier: string]:TemplateDefinition},
    styles?: {[identifier: string]:StyleDefinition},    
    name: string,
    menu: {category: string, icon: React.ReactElement},
    initData: ()=>any,
    onServerLoad?: (data:any)=>Promise<any>, //invoked in server side before loading
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

export const registerStyle = (style:StyleDefinition)=>{
    const tool = style.blocktype;
    const def = getDef(tool);
    if(!def){
        console.log("Tool not found: "+ tool);
    }else{
        if( !def.styles ){
            let newStyles = {} as {[identifier: string]:StyleDefinition};
            newStyles[style.identifier] = style;
            def.styles = newStyles;
        }else{
            def.styles[style.identifier] = style;
        }
    }
}

export const registerTemplate = (template:TemplateDefinition)=>{
    const tool = template.blocktype;
    const def = getDef(tool);
    if(!def){
        console.log("Tool not found: "+ tool);
    }else{
        if( !def.templates ){
            let newTemplates = {} as {[identifier: string]:TemplateDefinition};
            newTemplates[template.id] = template;
            def.templates = newTemplates;
        }else{
            def.templates[template.id] = template;
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
    let result:Array<{tool: string, toolDef:ToolDefinition, templateDef:TemplateDefinition}> = [];
    for(const tool of Object.keys(defMap)){
        const templates = defMap[tool].templates;
        if( templates ){
            for( const template of Object.keys(templates) ){
                result = [...result, {tool: tool, toolDef:defMap[tool], templateDef: templates[template]} ];
            }
        }
    }
    return result;
}

export const registerCategory = (category:{identifier:string, text: string})=>{
  let i=toolCategories.findIndex(item=>item.identifier==category.identifier);
  if(i==-1) toolCategories.push(category);
}

export const newBlockData = (type:string, template?:string)=>{
    const def = getDef(type);
    let defaultData = def.initData();
    defaultData.id = 'a'+nanoid(10);
    if( template ){
      if( def.templates && def.templates[template] ){
        const templateDef = def.templates[template];
        if( templateDef.data ){
            defaultData = templateDef.data;
        }
      }else{
        throw "template "+template+ " not found";
      }
    }

    return defaultData;
}