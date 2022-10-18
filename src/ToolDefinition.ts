export interface ToolDefinition {
    type:string,
    isComposited?: boolean,
    menu?: {text: string, category: string, icon: React.ReactElement},
    initData: any,
    def: (props:{data:any, active:boolean})=>React.ReactElement,    
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