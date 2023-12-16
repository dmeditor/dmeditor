import { toolImage } from '../../components/widget/Image/Image';
import { toolTable } from '../../components/widget/Table/BlockTable';
import { toolText } from '../../components/widget/Text/Text';
import { toolVideo } from '../../components/widget/Video/Video';
import { toolCode } from '../../components/widget/Code/Code';
import { toolCollapsableText } from '../../components/widget/CollapsableText/CollapsableText';
import { toolAccordion } from '../../components/widget/Accordion/Accordion';
import { toolBlockTab } from '../../components/widget/Tabs/Tabs';
import { toolImageText } from '../../components/widget/ImageText/ImageText';
import { toolContainerGrid } from '../../components/widget/Grid/Grid';
import { toolContainerList } from '../../components/widget/List/List';
import { toolHeading } from '../../components/widget/Heading/Heading';
import { toolIframe } from '../../components/widget/IFrame/IFrame';
import { toolQuote } from '../../components/widget/Quote/Quote';
import { initStyles } from '../../../styles/InitStyles';
import { initTemplates } from '../../../templates/InitTemplate';
import { registerCategory, registerTool } from '../../../ToolDefinition';

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
