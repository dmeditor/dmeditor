import { ReactElement } from "react";
import { BlockData } from "./Main";

export interface BlockHandler {
    type:string;
    onDataChange: (ele:HTMLElement)=>any;    
    getDefaultData: ()=>BlockData;    //when block type is selected
    renderMain: (data:BlockData, isActive:boolean, onChange?:(data:any)=>void, onSubSelect?:(data:any)=>void)=>ReactElement, onUpdateProperty?:any;    
    renderSetting: (data:BlockData, onSetting: any, params?:any) => ReactElement
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