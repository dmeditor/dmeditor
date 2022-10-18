import { BlockHandler, RenderMainProps, RenderSettingProps } from "./blocktype";
import { blockManager } from "./BlockManager";
import { FullImageHandler } from "./blocks/FullImage";
import { HeadingHandler } from "./blocks/Heading";
import { TextMediaHandler } from "./blocks/TextMedia";
import { QuoteHandler } from './blocks/Quote' //start 2022-9-28
import {toolTable} from "./blocks/Table";
import { ParagraphHandler } from "./blocks/Paragraph";
import { ContentBlockHandler } from "./blocks/ContentBlock";
import {
  AppRegistrationOutlined,
  CalendarMonth,
  CodeOutlined,
  CollectionsOutlined,
  FacebookOutlined,
  FormatQuoteOutlined,
  GridOn,
  GridViewOutlined,
  ImageOutlined,
  SquareOutlined,
  TabOutlined,
  TextFormatOutlined,
  TitleOutlined,
  Twitter,
  VideocamOutlined,
  ViewListOutlined,
} from "@mui/icons-material";
import { registerTool } from "./ToolDefinition";
import { toolText } from "./blocks/BlockText";
import { toolImageText } from "./blocks/composition/ImageText";
import { toolButton } from "./blocks/BlockButton";
import { toolImage } from "./blocks/BlockImage";

registerTool(toolText);
registerTool(toolImageText);
registerTool(toolButton);
registerTool(toolImage);

registerTool(
  { type: 'heading',
    isComposited: false,
    menu: {text:'Heading',category:'basic',icon: <TitleOutlined /> },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool( toolTable );

// registerTool(
//   { type: 'full_image',
//     menu:  {text:"Image", category:'basic',icon: <ImageOutlined /> },
//     initData: 'test',
//     def: ()=> <div>Not implemented</div>}
// );

registerTool(
  { type: 'quote',
    menu: { text: 'Quote', category: 'basic', icon: <TitleOutlined /> },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "video",
    menu: {
      text: "Video",
      category: "basic",
      icon: <VideocamOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "code",
    menu: {
      text: "Code",
      category: "basic",
      icon: <CodeOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { 
    type: 'content_grid',
    menu: {text:"Content grid", category:'content_block', icon: <GridViewOutlined /> },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "content_block",
    menu: {
      text: "Embed content",
      category: "content_block",
      icon: <SquareOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "carousel",
    menu: {
      text: "Carousel",
      category: "content_block",
      icon: <CollectionsOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "tab",
    menu: { text: "Tab", category: "util", icon: <TabOutlined /> },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "expandable_list",
    menu: {
      text: "Expandable list",
      category: "util",
      icon: <ViewListOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "calendar",
    menu: {
      text: "Calendar events",
      category: "content_block",
      icon: <CalendarMonth />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

registerTool(
  { type: "superoffice_form",
    menu: {
      text: "SuperOffice form",
      category: "superoffice",
      icon: <AppRegistrationOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);
registerTool(
  { type: "gallery",
    menu: {
      text: "Gallery",
      category: "content_block",
      icon: <CollectionsOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);
registerTool(
  { type: "facebook",
    menu: {
      text: "Facebook page",
      category: "social_network",
      icon: <FacebookOutlined />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);
registerTool(
  { type: "twitter",
    menu: {
      text: "Twitter tweet",
      category: "social_network",
      icon: <Twitter />,
    },
    initData: 'test',
    def: ()=> <div>Not implemented</div>}
);

