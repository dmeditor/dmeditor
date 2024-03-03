import { initStyles } from '../../../styles/InitStyles';
import { initTemplates } from '../../../templates/InitTemplate';
import { registerCategory, registerTool } from '../../../ToolDefinition';
import { toolAccordion } from '../../components/widgets/accordion/Accordion';
import { toolCode } from '../../components/widgets/code/Code';
import { toolCollapsableText } from '../../components/widgets/collapsable-text/CollapsableText';
// import { toolBlockTab } from '../../components/widgets/tabs/render';
// import { toolImageText } from '../../components/widgets/image-text/ImageText';
// import { toolContainerList } from '../../components/widgets/list/List';

import Heading from '../../components/widgets/heading/src/Heading';
// import { toolIframe } from '../../components/widgets/iframe/IFrame';
import { toolImage } from '../../components/widgets/image/Image';
import { toolQuote } from '../../components/widgets/quote/Quote';
import { toolText } from '../../components/widgets/text/Text';

// registerTool(toolText);
// registerTool(toolImageText);
registerTool(toolImage);
// registerTool(Heading);
// registerTool(toolBlockTab);
registerTool(toolAccordion);
registerTool(toolQuote);
registerTool(toolCode);
registerTool(toolCollapsableText);

// registerTool(toolContainerList);

initStyles();

initTemplates();
