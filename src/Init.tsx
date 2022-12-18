// import { ParagraphHandler } from "./blocks/Paragraph";
import {
  CollectionsOutlined,
  TabOutlined,
  ViewListOutlined,
} from "@mui/icons-material";
import { registerTemplate, registerTool } from "./ToolDefinition";
import { toolText } from "./blocks/BlockText";
import { toolImageText } from "./blocks/composition/ImageText";
import { toolImageHeadingText } from "./blocks/composition/ImageHeadingText";
import { toolButton } from "./blocks/BlockButton";
import { toolImage } from "./blocks/BlockImage";
import { toolQuote } from "./blocks/Quote";
import { toolHeading } from "./blocks/Heading";
import { toolTable } from "./blocks/BlockTable";
import { toolVideo } from "./blocks/BlockVideo";
import { toolIframe } from "./blocks/IFrame";
import { toolCode } from "./blocks/Code";

registerTool(toolText);
registerTool(toolImageText);
registerTool(toolButton);
registerTool(toolImage);
registerTool(toolHeading);
registerTool(toolImageHeadingText);
registerTool(toolTable);
registerTool(toolQuote);
registerTool(toolVideo);
registerTool(toolCode);
registerTool(toolIframe);

//templates
registerTemplate('heading', { identifier:'blocktext_heading', 
    name:'Block heading', 
    initData: ()=>{
      const data = toolHeading.initData();
      return {...data, data:'Hello', common:{...data.common, color: '#9C27B0' }}
    }, 
    icon:toolHeading.menu.icon });
    
registerTemplate('imagetext', { identifier:'loose', name:'Loose image text', 
    initData: ()=>{
      const data = toolImageText.initData();
      return {...data, common:{...data.common, color: '#ffffff', backgroundColor: '#133e48'}}; 
    },
    icon:toolImageText.menu.icon }
    );