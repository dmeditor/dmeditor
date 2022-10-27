import { BlockHandler, RenderMainProps, RenderSettingProps } from "./blocktype";
import { blockManager } from "./BlockManager";
// import { ParagraphHandler } from "./blocks/Paragraph";
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
registerTool(toolTable);
registerTool(toolQuote);
registerTool(toolVideo);
registerTool(toolCode);

// registerTool({
//   type: "code",
//   menu: {
//     text: "Code",
//     category: "basic",
//     icon: <CodeOutlined />,
//   },
//   initData: "test",
//   render: () => <div>Not implemented</div>,
// });

registerTool(toolIframe);

registerTool({
  type: "content_grid",
  menu: {
    text: "Content grid",
    category: "content_block",
    icon: <GridViewOutlined />,
  },
  initData: "test",
  render: () => <div>Not implemented</div>,
});

registerTool({
  type: "content_block",
  menu: {
    text: "Embed content",
    category: "content_block",
    icon: <SquareOutlined />,
  },
  initData: "test",
  render: () => <div>Not implemented</div>,
});

registerTool({
  type: "carousel",
  menu: {
    text: "Carousel",
    category: "content_block",
    icon: <CollectionsOutlined />,
  },
  initData: "test",
  render: () => <div>Not implemented</div>,
});

registerTool({
  type: "tab",
  menu: { text: "Tab", category: "blocks", icon: <TabOutlined /> },
  initData: "test",
  render: () => <div>Not implemented</div>,
});

registerTool({
  type: "expandable_list",
  menu: {
    text: "Expandable list",
    category: "blocks",
    icon: <ViewListOutlined />,
  },
  initData: "test",
  render: () => <div>Not implemented</div>,
});

registerTool({
  type: "calendar",
  menu: {
    text: "Calendar events",
    category: "content_block",
    icon: <CalendarMonth />,
  },
  initData: "test",
  render: () => <div>Not implemented</div>,
});

registerTool({
  type: "gallery",
  menu: {
    text: "Gallery",
    category: "content_block",
    icon: <CollectionsOutlined />,
  },
  initData: "test",
  render: () => <div>Not implemented</div>,
});

registerTool({
  type: "twitter",
  menu: {
    text: "Twitter tweet",
    category: "social_network",
    icon: <Twitter />,
  },
  initData: "test",
  render: () => <div>Not implemented</div>,
});
