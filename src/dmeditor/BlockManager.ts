import { ReactElement } from "react";
import { BlockData } from "./Main";

interface BlockHandler {
    type:string;
    onDataChange: (ele:HTMLElement)=>any;    
    renderMain: (data:BlockData)=>ReactElement;
    renderSetting: (data:BlockData, onSetting: any) => ReactElement
}

var blockHandlers:{[key:string]: BlockHandler;} ={};

var blockRenders: {[key:string]:(content:any)=>ReactElement} = {};

var blockSettings: {[key:string]:(content:any, onSetting:any)=>ReactElement} = {};

export const blockManager = {  
    registerBlockType: (handler:BlockHandler)=>{
        blockHandlers[handler.type] = handler;
    },

    getBlockType: (type:string): BlockHandler=>{
        return blockHandlers[type];
    }
}