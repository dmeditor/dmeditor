import { toolImage } from '../../components/widgets/image/Image';
import { toolTable } from '../../components/widgets/table/BlockTable';
import { toolText } from '../../components/widgets/text/Text';
import { toolVideo } from '../../components/widgets/video/Video';
import { toolCode } from '../../components/widgets/code/Code';
import { toolCollapsableText } from '../../components/widgets/collapsable-text/CollapsableText';
import { toolAccordion } from '../../components/widgets/accordion/Accordion';
// import { toolBlockTab } from '../../components/widgets/tabs/render';
import { toolImageText } from '../../components/widgets/image-text/ImageText';
import { toolContainerList } from '../../components/widgets/list/List';
import Heading from '../../components/widgets/heading/render';
import { toolIframe } from '../../components/widgets/iframe/IFrame';
import { toolQuote } from '../../components/widgets/quote/Quote';
import { initStyles } from '../../../styles/InitStyles';
import { initTemplates } from '../../../templates/InitTemplate';
import { registerCategory, registerTool } from '../../../ToolDefinition';

registerTool(toolText);
registerTool(toolImageText);
registerTool(toolImage);
// registerTool(Heading);
// registerTool(toolBlockTab);
registerTool(toolAccordion);
registerTool(toolTable);
registerTool(toolQuote);
registerTool(toolVideo);
registerTool(toolCode);
registerTool(toolIframe);
registerTool(toolCollapsableText);

registerTool(toolContainerList);

initStyles();

initTemplates();
