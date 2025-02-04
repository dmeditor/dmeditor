import { ViewWeekOutlined } from '@mui/icons-material';

import {
  registerIcon,
  registerSettingComponent,
  registerWidget,
  registerWidgetStyleOption,
} from '../..';
import { Layout3Columns, layout3ColumnsWidget } from './Layout3Columns';
import { Layout3ColumnsSetting } from './settings/Layout3ColumnsSetting';

const register = () => {
  registerWidget(layout3ColumnsWidget, { render: Layout3Columns });
  registerIcon({ name: 'layout-3columns', component: ViewWeekOutlined });
  registerSettingComponent('layout-3columns/setting', Layout3ColumnsSetting);
};

export default register;
