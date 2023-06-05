import { registerCategory, registerTool } from "./ToolDefinition";
import { toolText } from "./blocks/BlockText";
import { toolImageText } from "./blocks/composition/ImageText";
import { toolBlockTab } from "./blocks/composition/BlockTab";
import { toolAccordion } from "./blocks/composition/Accordion";
import { toolImage } from "./blocks/BlockImage";
import { toolQuote } from "./blocks/Quote";
import { toolHeading } from "./blocks/Heading";
import { toolTable } from "./blocks/BlockTable";
import { toolVideo } from "./blocks/BlockVideo";
import { toolIframe } from "./blocks/IFrame";
import { toolCode } from "./blocks/Code";
import { toolCollapsableText } from "./blocks/CollapsableText";
import { toolContainerGrid } from "./blocks/container/Grid";
import { toolContainerList } from "./blocks/container/List";
import { initStyles } from "./styles/InitStyles";
import { initTemplates } from "./templates/InitTemplate";

registerTool(toolText);
registerTool(toolImageText);
registerTool(toolImage);
registerTool(toolHeading);
registerTool(toolBlockTab);
registerTool(toolAccordion);
registerTool(toolTable);
registerTool(toolQuote);
registerTool(toolVideo);
registerTool(toolCode);
registerTool(toolIframe);
registerTool(toolCollapsableText);

registerTool(toolContainerGrid);
registerTool(toolContainerList);

initStyles();

initTemplates();