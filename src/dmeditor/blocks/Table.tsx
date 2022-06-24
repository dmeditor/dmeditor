import { ChangeEvent, ChangeEventHandler, ReactElement, useEffect, useState } from "react";
import { RenderMainProps, RenderSettingProps } from "../BlockManager";
import { BlockData, BlockLayoutData, DataTable } from "../Main"
import { CommonSetting } from "../Property";
import { Input } from "../utils/Input";
import { Ranger } from "../utils/Ranger";
import './Table.css';


const Table = (props:{data:BlockData, isActive:boolean})=>{
    const [content, SetContent] = useState(props.data.data as DataTable);

    useEffect(()=>{
        SetContent(props.data.data as DataTable);
    })

    return <div style={{...props.data.layout}}><table className="table" contentEditable={props.isActive}>
        <tbody>
            {content.map((row)=><tr>{row.map((col)=><td>{col}</td>)}</tr> )}
            </tbody>
        </table></div>
 }


const TableSettings = (props:RenderSettingProps)=>{
    const updateRow = (value:any) =>{
        let newRows = value;
        let data = props.data;
        let content = data.data as DataTable;
        let rows = content.length;
        let columns = content[0].length;

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
        data.data = content
        props.onSetting(data);
    }

    const updateColumn = (value:any) =>{
        let data = props.data;
        let newColumns = value;
        let content = data.data as DataTable;
    
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

        data.data = newContent
        props.onSetting(data);
    }

    const changeCommon = (settings:BlockLayoutData)=>{
        let data = props.data;
        data.layout = settings;
        props.onSetting(data);
    }

    return <div>
        <div>
        <label>Table</label>
        <table style={{width: '100%'}}>
        <tbody>
            <tr><td style={{width: '50px'}}>
                
                <label>Rows</label></td><td>
                <Ranger defaultValue={(props.data.data as DataTable).length} min={1} max={10} step={1} onChange={updateRow} />
                </td></tr>
            <tr>
                <td><label>Columns</label></td><td>
                <Ranger defaultValue={(props.data.data as DataTable)[0].length} min={1} max={5} step={1} onChange={updateColumn} />
                </td></tr>
            <tr>
            <td><label>Cell padding</label></td><td>
            <Ranger defaultValue={(props.data.data as DataTable)[0].length} min={1} max={5} step={1} onChange={updateColumn} />
            </td></tr>
        </tbody>
    </table>
    </div>
    <br />
    <CommonSetting settings={props.data.layout} onChange={changeCommon} />
    </div>
 }


 export const TableHandler = {
    type: 'table',
    onDataChange: (ele:HTMLElement):any => {},
    renderMain: (props:RenderMainProps)=><Table {...props} />,
    getDefaultData:():BlockData=>{
        return {
            layout:{padding: 0},
            data: [['test table', 'test table1']]};
    },
    renderSetting: (props: RenderSettingProps)=><TableSettings {...props} />
 }