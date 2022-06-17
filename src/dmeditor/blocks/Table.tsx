import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { DataTable } from "../Main"
import { Input } from "../utils/Input";
import { Ranger } from "../utils/Ranger";
import './Table.css';


export const Table = (props:{content:DataTable})=>{
    const [content, SetContent] = useState(props.content);

    useEffect(()=>{
        SetContent(props.content);
    })

    return <table className="table">
        <tbody>
            {content.map((row)=><tr>{row.map((col)=><td>{col}</td>)}</tr> )}
            </tbody>
        </table>
 }


export const TableSettings = (props:{content:DataTable, onSetting:any })=>{
    const updateRow = (value:any) =>{
        let newRows = value;
        let content = props.content;
        let rows = content.length;
        let columns = props.content[0].length;

        if( newRows > rows ){
            for( let i=rows; i<newRows; i++ ){
                let row = [];
                for(let j = 0;j<columns;j++){
                    row.push( 'New' );
                }
                content = [...content, row ]
            }
        }

        if( newRows < rows ){            
            content = content.slice(0, newRows);            
        }
        props.onSetting(content);
    }

    const updateColumn = (value:any) =>{
        let newColumns = value;
        let content = props.content;
    
        let newContent:DataTable = [];
        for( let row of content){
            if( newColumns < row.length ){
                let newRow = row.slice(0, newColumns);
                newContent.push(newRow);
            }else if( newColumns > row.length ){
                let newRow = [...row];
                for( let i = row.length; i<newColumns; i++ ){
                    newRow.push('New');
                }
                newContent.push(newRow);
            }else{
                return;
            }            
        }

        props.onSetting(newContent);
    }

    return <div>
        <div>
        <label>Table</label>
        <hr />        
        <table style={{width: '100%'}}>
        <tbody>
            <tr><td style={{width: '50px'}}>
                
                <label>Rows</label></td><td>
                <Ranger defaultValue={props.content.length} min={1} max={10} step={1} onChange={updateRow} />
                </td></tr>
            <tr>
                <td><label>Columns</label></td><td>
                <Ranger defaultValue={props.content[0].length} min={1} max={5} step={1} onChange={updateColumn} />
                </td></tr>
        </tbody>
    </table>
    </div>
    <br />
    <br />
    <div>
        <label>Layout</label>
        <hr />   
        <table style={{width: '100%'}}>
        <tbody>
            <tr>
            <td>Width(%)</td><td>
            <Ranger defaultValue={100} min={10} max={100} step={10} onChange={()=>{}} />
            </td></tr>
            <tr>
            <td>Height</td><td>
            <Input />
            </td></tr>
        </tbody>
    </table>     
    </div>
    
    </div>
 }