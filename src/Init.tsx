import { BlockHandler, RenderMainProps, RenderSettingProps } from "./blocktype";
import { blockManager } from "./BlockManager";
import { FullImageHandler } from "./blocks/FullImage";
import { HeadingHandler } from "./blocks/Heading";
import { TextMediaHandler } from "./blocks/TextMedia";
import { QuoteHandler } from './blocks/Quote' //start 2022-9-28

import { ParagraphHandler } from "./blocks/Paragraph";
import { TableHandler } from "./blocks/Table";
import { ContentBlockHandler } from "./blocks/ContentBlock";
import {
  AppRegistrationOutlined,
  CalendarMonth,
  CodeOutlined,
  CollectionsOutlined,
  FacebookOutlined,
  FormatQuoteOutlined,
  SquareOutlined,
  TabOutlined,
  Twitter,
  VideocamOutlined,
  ViewListOutlined,
} from "@mui/icons-material";

blockManager.registerBlockType(ParagraphHandler);
blockManager.registerBlockType(HeadingHandler);
blockManager.registerBlockType(TableHandler);
blockManager.registerBlockType(FullImageHandler);
blockManager.registerBlockType(TextMediaHandler);
blockManager.registerBlockType(ContentBlockHandler);
blockManager.registerBlockType(QuoteHandler) //start 2022-9-28

const emptyFields = {
  getDefaultData: () => {
    return { data: "", layout: {} };
  },
  renderMain:  (props:RenderMainProps)=><div>Not implemented</div>,
  renderSetting:(props:RenderSettingProps) => <div></div>,
};

const list: Array<BlockHandler> = [
  {
    ...emptyFields,
    type: "video",
    menu: {
      text: "Video",
      category: "basic",
      icon: <VideocamOutlined />,
    },
  },
  // {
  //   ...emptyFields,
  //   type: "quote",
  //   menu: { text: "Quote", category: "basic", icon: <FormatQuoteOutlined /> },
  // },
  {
    ...emptyFields,
    type: "code",
    menu: {
      text: "Code",
      category: "basic",
      icon: <CodeOutlined />,
    },
  },
  {
    ...emptyFields,
    type: "content_block",
    menu: {
      text: "Embed content",
      category: "content_block",
      icon: <SquareOutlined />,
    },
  },
  {
    ...emptyFields,
    type: "carousel",
    menu: {
      text: "Carousel",
      category: "content_block",
      icon: <CollectionsOutlined />,
    },
  },
  {
    ...emptyFields,
    type: "tab",
    menu: { text: "Tab", category: "util", icon: <TabOutlined /> },
  },
  {
    ...emptyFields,
    type: "expandable_list",
    menu: {
      text: "Expandable list",
      category: "util",
      icon: <ViewListOutlined />,
    },
  },
  {
    ...emptyFields,
    type: "calendar",
    menu: {
      text: "Calendar events",
      category: "content_block",
      icon: <CalendarMonth />,
    },
  },
  {
    ...emptyFields,
    type: "superoffice_form",
    menu: {
      text: "SuperOffice form",
      category: "superoffice",
      icon: <AppRegistrationOutlined />,
    },
  },
  {
    ...emptyFields,
    type: "gallery",
    menu: {
      text: "Gallery",
      category: "content_block",
      icon: <CollectionsOutlined />,
    },
  },
  {
    ...emptyFields,
    type: "facebook",
    menu: {
      text: "Facebook page",
      category: "social_network",
      icon: <FacebookOutlined />,
    },
  },
  {
    ...emptyFields,
    type: "twitter",
    menu: {
      text: "Twitter tweet",
      category: "social_network",
      icon: <Twitter />,
    },
  },
];

for (let item of list) {
  blockManager.registerBlockType(item);
}
