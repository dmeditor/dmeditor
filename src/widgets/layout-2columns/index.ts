import { registerIcon, registerWidget, registerWidgetStyleOption } from '../..';
import Icon from './icon/icon.svg';
import { Layout2Columns, layout2ColumnsWidget } from './Layout2Columns';

const register = () => {
  registerWidget(layout2ColumnsWidget, { render: Layout2Columns });
  registerIcon({ name: 'layout-2columns', component: Icon });
};

export default register;
