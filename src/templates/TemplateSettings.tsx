import React from "react"
import { getDef } from "../ToolDefinition";
import { MenuItem, Select } from "@mui/material";
import { PropertyItem } from "../utils";


export const TemplateSettings = (props:{blocktype:string, template:string, onChange:(template:string)=>void})=>{

    const def = getDef(props.blocktype);

    const templates = def.templates;    

    if( !templates ){
        return <></>;
    }

    //get keys sorted by name
    const keys = Object.keys(templates).sort((a:string, b:string)=>{
        if( templates[a].name<templates[b].name ){
            return -1;
        }else if( templates[a].name > templates[b].name ){
            return 1;
        }else{
            return 0;
        }
    });

    return <div>
        <PropertyItem label="Template">            
                <Select
                size="small"
                displayEmpty
                defaultValue={props.template}
                onChange={(e)=>props.onChange(e.target.value)}>
                <MenuItem value=''>None</MenuItem>
                {keys.map(identifier=><MenuItem value={identifier}>{templates[identifier].name}</MenuItem>)}            
            </Select>
            </PropertyItem>     
        </div>   
}