import { toolImage } from './blocks/BlockImage';
import { toolTable } from './blocks/BlockTable';
import { toolText } from './blocks/BlockText';
import { toolVideo } from './blocks/BlockVideo';
import { toolCode } from './blocks/Code';
import { toolCollapsableText } from './blocks/CollapsableText';
import { toolAccordion } from './blocks/composition/Accordion';
import { toolBlockTab } from './blocks/composition/BlockTab';
import { toolImageText } from './blocks/composition/ImageText';
import { toolContainerGrid } from './blocks/container/Grid';
import { toolContainerList } from './blocks/container/List';
import { toolHeading } from './blocks/Heading';
import { toolIframe } from './blocks/IFrame';
import { toolQuote } from './blocks/Quote';
import { initStyles } from './styles/InitStyles';
import { initTemplates } from './templates/InitTemplate';
import { registerCategory, registerTool } from './ToolDefinition';

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
