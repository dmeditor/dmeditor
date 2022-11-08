// import { ParagraphHandler } from "./blocks/Paragraph";
import {
  TabOutlined,
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
registerTool(toolIframe);


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
