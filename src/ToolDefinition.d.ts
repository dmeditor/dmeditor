/// <reference types="react" />
export interface BlockData {
    data?: any;
    id?: string;
    style?: string;
    settings?: {
        style?: any;
        [propName: string]: any;
    };
    source?: any;
    children?: Array<BlockData>;
}
export interface ToolRenderProps {
    blockdata: BlockData;
    active: boolean;
    adding?: boolean;
    options?: any;
    view?: boolean;
    onChange: (data: any, shouldDebounce?: boolean) => void;
    onCancel?: () => void;
    inBlock?: boolean;
    onDelete?: () => void;
}
export interface StyleDefinition {
    blocktype: string;
    identifier: string;
    name: string;
    icon?: React.ReactElement;
    css?: string;
    options?: {
        [setting: string]: any;
    };
}
export interface TemplateDefinition {
    name: string;
    blocktype: string;
    id: string;
    data: any;
}
export interface ToolDefinition {
    type: string;
    isComposited?: boolean;
    templates?: {
        [identifier: string]: TemplateDefinition;
    };
    styles?: {
        [identifier: string]: StyleDefinition;
    };
    name: string;
    menu: {
        category: string;
        icon: React.ReactElement;
    };
    initData: () => BlockData;
    onServerLoad?: (data: any, context?: any) => Promise<any>;
    render: (props: ToolRenderProps) => React.ReactElement;
}
export declare const getToolDefinitions: () => {
    [key: string]: ToolDefinition;
};
export declare const registerTool: (toolDef: ToolDefinition) => void;
export declare const registerPopularBlocktypes: (list: string[]) => void;
export declare const getPopularBlocktypes: () => string[];
export declare const getDef: (type: string) => ToolDefinition;
export declare const registerStyle: (style: StyleDefinition) => void;
export declare const registerTemplate: (template: TemplateDefinition) => void;
export declare const getCategories: () => {
    identifier: string;
    text: string;
}[];
export declare const getAllTemplates: () => {
    tool: string;
    toolDef: ToolDefinition;
    templateDef: TemplateDefinition;
}[];
export declare const registerCategory: (category: {
    identifier: string;
    text: string;
}) => void;
export declare const newBlockData: (type: string, template?: string) => BlockData;
