import { GridOn } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { RenderMainProps, RenderSettingProps } from "../blocktype";
import { BlockData, BlockLayoutData } from "../types"
import { Ranger } from "../utils/Ranger";
import './Table.css';
import { BlockProperty } from "../BlockProperty";
import React from "react";
import { Block } from "../Block";
import { ToolDefinition } from "../ToolDefinition";

export const Table = (props:any)=>{
    const [content, SetContent] = useState([["Hello", "Test"]]);

    return <div style={{...props.data.layout}}>
                    <BlockProperty title={'Table'} active={props.active}>
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr><td style={{width: '50px'}}>
                                
                                <label>Rows</label></td><td>
                                <Ranger defaultValue={ content.length} min={1} max={10} step={1} onChange={()=>{}} />
                                </td></tr>
                            <tr>
                                <td><label>Columns</label></td><td>
                                <Ranger defaultValue={3} min={1} max={5} step={1} onChange={()=>{}} />
                                </td></tr>
                            <tr>
                            <td><label>Cell padding</label></td><td>
                            <Ranger defaultValue={3} min={1} max={5} step={1} onChange={()=>{}} />
                            </td></tr>
                        </tbody>
                    </table>
                    </BlockProperty>
        
        <table className="table" contentEditable={props.isActive}>
        <tbody>
            {content.map((row)=><tr>{row.map((col)=><td>{col}</td>)}</tr> )}
            </tbody>
        </table></div>
 }


 export const toolTable:ToolDefinition = {
    type: 'table',
    menu: {text:"Table", category:'basic', icon: <GridOn /> }, 
    initData: [["Test", "Test2"]],    
    def: (props:{data:any, active:boolean})=><Table {...props} />
 }