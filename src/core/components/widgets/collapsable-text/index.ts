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
        .dme-w-button-container{
           text-align: center;
        }

        .dme-w-button{
          border: 1px solid #cccccc;
          padding: 10px;
          border-radius: 5px;
        }

        .dme-w-button:hover{
          background: #f0f0f0;
        }
  `,
    },
  ]);
};
