import { toolAccordion } from '../../components/widgets/accordion/Accordion';
import { toolCode } from '../../components/widgets/code/Code';
// import { toolBlockTab } from '../../components/widgets/tabs/render';
// import { toolImageText } from '../../components/widgets/image-text/ImageText';
// import { toolContainerList } from '../../components/widgets/list/List';

import Heading from '../../components/widgets/heading/src/Heading';
// import { toolIframe } from '../../components/widgets/iframe/IFrame';
import { toolQuote } from '../../components/widgets/quote/Quote';
import { initStyles } from '../../styles/InitStyles';
import { initTemplates } from '../../templates/InitTemplate';
import { registerCategory, registerTool } from '../../ToolDefinition';

// registerTool(toolText);
// registerTool(toolImageText);
// registerTool(Heading);
// registerTool(toolBlockTab);
registerTool(toolAccordion);
registerTool(toolQuote);
registerTool(toolCode);

// registerTool(toolContainerList);

initStyles();

initTemplates();
