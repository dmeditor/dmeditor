import { DataTable } from "../Main"

export const Table = (props:{content:DataTable})=>{
    return <table width={'100%'} style={{height: '200px'}}><tbody><tr><td>{props.content[0][0]}</td></tr></tbody></table>
 }


export const TableSettings = (props:{})=>{
    return <div><table>
        <tbody>
            <tr><td>Rows</td><td><select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select></td></tr>
            <tr><td>Columns</td><td>
            <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                </td></tr>
        </tbody>
    </table></div>
 }