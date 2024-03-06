import { ReorderOutlined } from '@mui/icons-material';
import { nanoid } from 'nanoid';

import { registerWidget, registerWidgetVariant } from '..';
import { registerIcon } from '../../icon/icon-data';
import listWidget from './definition';
import { List } from './List';
import { DMEData } from 'Src/core/types/dmeditor';

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
            style: { type: 'primary' },
          },
        ],
      };
    },
  });
};

export default register;
