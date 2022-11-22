export interface ToolRenderProps {
    data: {data:any, settings?:any, common?:any, source?:any }, 
    active:boolean,
    adding?:boolean, 
    onChange:(data:any)=>void,
    onCancel?:()=>void
} 

export interface ToolDefinition {
    type:string,
    isComposited?: boolean,
    menu?: {text: string, category: string, icon: React.ReactElement},
    initData: any,
    view:(props:{data:any})=>React.ReactElement
    render: (props:ToolRenderProps)=>React.ReactElement,    
}

let defMap: {[key: string]: ToolDefinition} = {};

export const GetToolDefinitions = () => {
    return defMap;
};

export const registerTool = (toolDef:ToolDefinition)=>{
    defMap[toolDef.type] = toolDef;
}

export const getDef = (type:string):ToolDefinition=>{
    return defMap[type];
}

const toolCategories = [
    {identifier: 'basic', text: 'Basic'},
    {identifier: 'blocks', text: 'Blocks'},
    {identifier: 'content', text: 'Content'},
    {identifier: 'form', text: 'Form'},        
    {identifier: 'social_network', text: 'Social Network'}        
    ];

export const GetCategories = () => {
    return toolCategories;
};

export const registerCategory = (category:{identifier:string, text: string})=>{
    toolCategories.push(category);
}