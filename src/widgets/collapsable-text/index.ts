import { ExpandCircleDownOutlined, TitleOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget, registerWidgetStyleOption } from '../..';
import { CollapsableText, CollapsableTextDefiniation } from './CollapsableText';

export default () => {
  registerWidget(CollapsableTextDefiniation, { render: CollapsableText });
  registerIcon({ name: 'collapsable-text', component: ExpandCircleDownOutlined });
};
