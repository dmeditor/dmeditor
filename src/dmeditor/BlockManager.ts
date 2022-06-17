import { ReactElement } from "react";

var blockRenders: {[key:string]:(content:any)=>ReactElement} = {};

var blockSettings: {[key:string]:(content:any)=>ReactElement} = {};

export const blockManager = {
    getBlock: (type: string): (content:any)=>ReactElement=>{
        return blockRenders[type];
    },
    getBlockSettings: (type: string):(content:any)=>ReactElement=>{
        return blockSettings[type];
    },
    registerBlock: (type: string, render: (content:any)=>ReactElement)=>{
        blockRenders[type] = render;
    },
    registerBlockSetting: (type: string, render:(content:any)=>ReactElement)=>{
        blockSettings[type] = render;
    }    
}
