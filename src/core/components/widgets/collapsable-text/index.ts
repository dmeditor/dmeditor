import { TitleOutlined } from '@mui/icons-material';

import { registerWidget, registerWidgetStyleOption } from '..';
import { registerIcon } from '../../icon/icon-data';
import { CollapsableText, CollapsableTextDefiniation } from './CollapsableText';

export default () => {
  registerWidget(CollapsableTextDefiniation, CollapsableText);
  registerIcon({ name: 'collapsable-text', component: TitleOutlined });
  registerWidgetStyleOption('collapsable-text', [
    {
      name: 'Default',
      identifier: 'default',
      cssStyle: `
        .dme-w-button{
           text-align: center;
           padding: 10px;
        }
  `,
    },
  ]);
};
