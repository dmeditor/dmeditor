import {
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from 'dmeditor/components/widgets';

import { registerIcon } from '../../icon/icon-data';
import Icon from './icon/icon.svg';
import { Layout2Columns, layout2ColumnsWidget } from './Layout2Columns';

const register = () => {
  registerWidget(layout2ColumnsWidget, { render: Layout2Columns });
  registerIcon({ name: 'layout-2columns', component: Icon });
  registerWidgetStyleOption('layout-2columns', [
    {
      identifier: 'border',
      name: 'Border',
      cssStyle: `
      & > .dme-w-column1{
        border-right: 1px solid #cccccc;
      }
    `,
    },
  ]);
};

export default register;
