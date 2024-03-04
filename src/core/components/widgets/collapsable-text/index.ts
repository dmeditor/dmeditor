import { TitleOutlined } from '@mui/icons-material';

import { registerWidget } from '..';
import { registerIcon } from '../../icon/icon-data';
import { CollapsableText, CollapsableTextDefiniation } from './CollapsableText';

export default () => {
  registerWidget(CollapsableTextDefiniation, CollapsableText);
  registerIcon({ name: 'collapsable-text', component: TitleOutlined });
};
