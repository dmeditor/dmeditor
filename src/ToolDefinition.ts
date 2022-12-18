export interface ToolRenderProps {
    data: {data:any, id:string, settings?:any, common?:any, source?:any,[propName:string]:any, children?:Array<any> }, 
    active:boolean,
    adding?:boolean, 
    onChange:(data:any)=>void,
    onCancel?:()=>void,
    inBlock:boolean
} 

export interface ToolDefinition {
    type:string,
    isComposited?: boolean,
    name: string,
    menu: {category: string, icon: React.ReactElement},
    initData: any,
    onServerLoad?: (data:any)=>Promise<any>, //invoked in server side before loading
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