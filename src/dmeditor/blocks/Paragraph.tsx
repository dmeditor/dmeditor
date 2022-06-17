import React, { useState } from 'react';


export const Paragraph = (props:{content:any})=>{
   return <p>{props.content}</p>
}


export const ParagraphSettings = (props:{content:any, onSetting:any})=>{
    return <div><table>
        <tbody>
            <tr><td>Bold</td><td></td></tr>
            <tr><td>Italic</td><td>           
     </td></tr>
        </tbody>
    </table></div>
 }