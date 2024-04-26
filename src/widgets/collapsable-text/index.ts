import { TitleOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget, registerWidgetStyleOption } from '../../core';
import { CollapsableText, CollapsableTextDefiniation } from './CollapsableText';

export default () => {
  registerWidget(CollapsableTextDefiniation, { render: CollapsableText });
  registerIcon({ name: 'collapsable-text', component: TitleOutlined });
  registerWidgetStyleOption('collapsable-text', [
    {
      name: 'Default',
      identifier: 'default',
      cssClasses: { button: 'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4' },
      cssStyle: `
        .dme-w-button-container{
           text-align: center;
        }

        .dme-w-button:hover{
          background: #f0f0f0;
        }
  `,
    },
  ]);
};
