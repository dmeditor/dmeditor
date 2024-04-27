import { ReorderOutlined } from '@mui/icons-material';
import { nanoid } from 'nanoid';

import type { DMEData } from '../..';
import { registerIcon, registerWidget, registerWidgetVariant } from '../..';
import listWidget from './definition';
import { List } from './List';

const register = () => {
  registerWidget(listWidget, { render: List });
  registerIcon({ name: 'list', component: ReorderOutlined });
  registerWidgetVariant({
    widget: 'list',
    identifier: 'button',
    name: 'Button list',
    allowedTypes: ['button'],
    getDefaultData: (): DMEData.Block<unknown> => {
      return {
        id: nanoid(),
        type: 'list:button',
        data: { direction: 'horizontal' },
        children: [
          {
            id: nanoid(),
            type: 'button',
            data: { value: 'Button', link: '#' },
          },
        ],
      };
    },
  });
};

export default register;
