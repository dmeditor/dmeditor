import { AccountBalanceOutlined, AppBlockingOutlined, AppRegistrationOutlined, BrowseGallery, CalendarMonth, CodeOffOutlined, CodeOutlined, CollectionsOutlined, FacebookOutlined, FormatQuote, FormatQuoteOutlined, GolfCourseOutlined, GridOn, GridViewOutlined, HtmlOutlined, ImageOutlined, NetworkCellOutlined, PermMediaOutlined, TextSnippetOutlined, TitleOutlined, Twitter, VideocamOutlined, WidgetsOutlined } from '@mui/icons-material';
import { ImageList, Input } from '@mui/material';
import { useState } from 'react';
import './MoreBlocks.css';

export const MoreBlocks = (props:{onSelect:any})=>{
    const blockTypes = [
        {text:"Heading", type:'heading', icon: <TitleOutlined style={{fontSize: '28px'}} /> },
        {text:"Paragraph", type:'p', icon: <TextSnippetOutlined style={{fontSize: '28px'}} /> },
        {text:"Table", type:'table', icon: <GridOn style={{fontSize: '28px'}} /> }, 
        {text:"Text Media", type:'text_media', icon: <PermMediaOutlined style={{fontSize: '28px'}} /> },
        {text:"Full image", type:'full_image', icon: <ImageOutlined style={{fontSize: '28px'}} /> },    
        {text:"Quote", type:'quote', icon: <FormatQuoteOutlined style={{fontSize: '28px'}} /> },
        {text:"Code", type:'quote', icon: <CodeOutlined style={{fontSize: '28px'}} /> },    
        {text:"Content blocks", type:'content_block', icon: <GridViewOutlined style={{fontSize: '28px'}} /> },
        {text:"Carousel", type:'carousel', icon: <CollectionsOutlined style={{fontSize: '28px'}} /> },
        {text:"Calendar events", type:'calendar', icon: <CalendarMonth style={{fontSize: '28px'}} /> },    
        {text:"Last course", type:'last_course', icon: <AccountBalanceOutlined style={{fontSize: '28px'}} /> },    
        {text:"Video", type:'video', icon: <VideocamOutlined style={{fontSize: '28px'}} /> },
        {text:"Superoffice Form", type:'superoffice_form', icon: <AppRegistrationOutlined style={{fontSize: '28px'}} /> },          
        {text:"Gallery", type:'gallery', icon: <CollectionsOutlined style={{fontSize: '28px'}} /> },     
        {text:"Facebook", type:'facebook', icon: <FacebookOutlined style={{fontSize: '28px'}} /> },
        {text:"Twitter", type:'twitter', icon: <Twitter style={{fontSize: '28px'}} /> },    
        ];

    const [list, setList] = useState(blockTypes);

   

    const search = (e:any)=>{
        let input = e.target.value.toLowerCase();
        let list = blockTypes.filter((item)=>item.text.toLowerCase().includes(input))
        setList(list);
    };

    return (<div style={{background: 'white'}}>
        <div style={{fontSize:'20px', padding: '10px 4px'}}>Please choose a block type</div>

        <div style={{background:'white'}}>
        <Input fullWidth placeholder='Type to search' onChange={search} autoFocus style={{padding: '10px'}} />
        </div>
        {list.map((blockType, index)=><div key={index} className="moreblock" onClick={()=>props.onSelect(blockType.type)}>
               <table style={{width:'100%'}}>
                   <tr><td style={{width: '36px'}}>{blockType.icon}</td><td style={{textAlign:'left'}}>{blockType.text}</td></tr>                    
                </table>
            </div>)}

    </div>)
    
}