import { Layout2Columns, layout2ColumnsWidget } from './Layout2Columns';
import {
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from 'Src/core/components/widgets';

const register = () => {
  registerWidget(layout2ColumnsWidget, Layout2Columns);
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
