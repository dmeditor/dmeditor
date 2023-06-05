import React from "react"
import { getDef } from "../ToolDefinition";
import { MenuItem, Select } from "@mui/material";
import { PropertyItem } from "../utils";


export const StyleSettings = (props:{blocktype:string, template:string, onChange:(template:string)=>void})=>{

    const def = getDef(props.blocktype);

    const styles = def.styles;    

    if( !styles ){
        return <></>;
    }

    //get keys sorted by name
    const keys = Object.keys(styles).sort((a:string, b:string)=>{
        if( styles[a].name<styles[b].name ){
            return -1;
        }else if( styles[a].name > styles[b].name ){
            return 1;
        }else{
            return 0;
        }
    });

    return <div>
        <PropertyItem label="Style">            
                <Select
                size="small"
                displayEmpty
                defaultValue={props.template}
                onChange={(e)=>props.onChange(e.target.value)}>
                <MenuItem value=''>None</MenuItem>
                {keys.map(identifier=><MenuItem value={identifier}>{styles[identifier].name}</MenuItem>)}            
            </Select>
            </PropertyItem>     
        </div>   
}