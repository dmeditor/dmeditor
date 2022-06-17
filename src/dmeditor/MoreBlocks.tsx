import { AccountBalanceOutlined, BrowseGallery, CalendarMonth, CollectionsOutlined, FacebookOutlined, GolfCourseOutlined, GridOn, GridViewOutlined, ImageOutlined, Twitter, VideocamOutlined } from '@mui/icons-material';
import { ImageList } from '@mui/material';
import './MoreBlocks.css';

export const MoreBlocks = (props:{onSelect:any})=>{
    const blockTypes = [
    {text:"Table", type:'table', icon: <GridOn style={{fontSize: '28px'}} /> }, 
    {text:"Full image", type:'full_image', icon: <ImageOutlined style={{fontSize: '28px'}} /> },
    {text:"Content blocks", type:'content_block', icon: <GridViewOutlined style={{fontSize: '28px'}} /> },    
    {text:"Carousel", type:'carousel', icon: <CollectionsOutlined style={{fontSize: '28px'}} /> },
    {text:"Calendar events", type:'calendar', icon: <CalendarMonth style={{fontSize: '28px'}} /> },    
    {text:"Last course", type:'last_course', icon: <AccountBalanceOutlined style={{fontSize: '28px'}} /> },    
    {text:"Video", type:'video', icon: <VideocamOutlined style={{fontSize: '28px'}} /> },  
    {text:"Gallery", type:'gallery', icon: <CollectionsOutlined style={{fontSize: '28px'}} /> },     
    {text:"Facebook", type:'facebook', icon: <FacebookOutlined style={{fontSize: '28px'}} /> },
    {text:"Twitter", type:'twitter', icon: <Twitter style={{fontSize: '28px'}} /> },
    
    ];

    return (<div>
        <h3>Please choose a block type</h3>
        {blockTypes.map((blockType, index)=><div key={index} className="moreblock" onClick={()=>props.onSelect(blockType.type)}>
               <table style={{width:'100%'}}>
                   <tr><td style={{width: '36px'}}>{blockType.icon}</td><td style={{textAlign:'left'}}>{blockType.text}</td></tr>                    
                </table>
            </div>)}

    </div>)
    
}