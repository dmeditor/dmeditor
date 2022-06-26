import { AccountBalanceOutlined, AppBlockingOutlined, AppRegistrationOutlined, BrowseGallery, CalendarMonth, CodeOffOutlined, CodeOutlined, CollectionsOutlined, ExpandCircleDownOutlined, FacebookOutlined, FormatQuote, FormatQuoteOutlined, GolfCourseOutlined, GridOn, GridViewOutlined, HtmlOutlined, ImageOutlined, MenuOpenOutlined, NetworkCellOutlined, PermMediaOutlined, SquareOutlined, TabOutlined, TextSnippetOutlined, TitleOutlined, Twitter, VideocamOutlined, ViewListOutlined, WidgetsOutlined } from '@mui/icons-material';
import { Collapse, ImageList, Input } from '@mui/material';
import { useState } from 'react';
import './MoreBlocks.css';

export const MoreBlocks = (props:{onSelect:any})=>{
    const blockCategory = [
        {identifier: 'basic', text: 'Basic'},
        {identifier: 'content_block', text: 'Content'},
        {identifier: 'pre_designed', text: 'Pre designed'},        
        {identifier: 'util', text: 'Utility'},
        {identifier: 'superoffice', text: 'SuperOffice'},
        {identifier: 'social_network', text: 'Social Network'}        
        ];

    const iconStyle={fontSize: 26};
    
    const blockTypes = [
        {text:"Heading", category:'basic', type:'heading', icon: <TitleOutlined style={iconStyle} /> },
        {text:"Paragraph", category:'basic', type:'p', icon: <TextSnippetOutlined style={iconStyle} /> },
        {text:"Table", category:'basic', type:'table', icon: <GridOn style={iconStyle} /> }, 
        {text:"Text media", category:'pre_designed', type:'text_media', icon: <PermMediaOutlined style={iconStyle} /> },
        {text:"Full image", category:'basic', type:'full_image', icon: <ImageOutlined style={iconStyle} /> },    
        {text:"Video", category:'basic', type:'video', icon: <VideocamOutlined style={iconStyle} /> },
        {text:"Quote", category:'basic', type:'quote', icon: <FormatQuoteOutlined style={iconStyle} /> },
        {text:"Code", category:'basic', type:'quote', icon: <CodeOutlined style={iconStyle} /> },    
        {text:"Content grid", category:'content_block', type:'content_block', icon: <GridViewOutlined style={iconStyle} /> },
        {text:"Embed content", category:'content_block', type:'content', icon: <SquareOutlined style={iconStyle} /> },
        {text:"Carousel", category:'content_block', type:'carousel', icon: <CollectionsOutlined style={iconStyle} /> },
        {text:"Tab", category:'util', type:'tab', icon: <TabOutlined style={iconStyle} /> },            
        {text:"Expandable list", category:'util', type:'expandable_list', icon: <ViewListOutlined style={iconStyle} /> },                    
        {text:"Calendar events", category:'content_block', type:'calendar', icon: <CalendarMonth style={iconStyle} /> },    
        {text:"SuperOffice form", category:'superoffice',  type:'superoffice_form', icon: <AppRegistrationOutlined style={iconStyle} /> },          
        {text:"Gallery", category:'content_block',  type:'gallery', icon: <CollectionsOutlined style={iconStyle} /> },     
        {text:"Facebook page", category:'social_network',  type:'facebook', icon: <FacebookOutlined style={iconStyle} /> },
        {text:"Twitter tweet",  category:'social_network', type:'twitter', icon: <Twitter style={iconStyle} /> },    
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
        {blockCategory.map((category)=><div>
            {list.filter(item=>item.category==category.identifier).map((blockType, index)=>
                <>{index==0&&<div style={{padding: '5px 0px', color: '#4f4f4f', margin:'5px 10px' }}>{category.text}</div>}
                <div key={index} className="moreblock" onClick={()=>props.onSelect(blockType.type)}>
                <table style={{width:'100%'}}>
                    <tr><td style={{width: '28px'}}>{blockType.icon}</td><td style={{textAlign:'left'}}>{blockType.text}</td></tr>                    
                </table>
            </div></>
            )}
        </div>)}

    </div>)
    
}