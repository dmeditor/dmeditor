import React, { ReactElement } from "react";
import { BlockData } from "./Main";

export interface RenderMainProps{
    data:BlockData,
    isActive:boolean, 
    onChange?:(data:any)=>void,
    onSubSelect?:(data:any)=>void,
    onUpdateProperty?:any
}

export interface RenderSettingProps{
    data:BlockData, 
    onSetting: any, 
    params?:any
}

export interface BlockHandler {
    type:string;
    canSelectElement?: boolean,
    onDataChange: (ele:HTMLElement)=>any;    
    getDefaultData: ()=>BlockData;    //when block type is selected
    renderMain: React.FC<RenderMainProps>,       
    renderSetting: React.FC<RenderSettingProps>
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