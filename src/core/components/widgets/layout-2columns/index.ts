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
      identifier: 'half-half',
      name: '1/2 1/2',
      cssStyle: `
      grid-template-columns: 50% 50%;
    `,
    },
    {
      identifier: 'one-third-left',
      name: '1/3 2/3',
      cssStyle: `
        grid-template-columns: 33.3% 67.7%;
      `,
    },
  ]);
};

export default register;
