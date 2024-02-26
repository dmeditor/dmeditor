import { Layout3Columns, layout3ColumnsWidget } from './Layout3Columns';
import { Layout3ColumnsSetting } from './settings/Layout3ColumnsSetting';
import {
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from 'Src/core/components/widgets';
import { registerSettingComponent } from 'Src/core/setting-panel/register';

const register = () => {
  registerWidget(layout3ColumnsWidget, Layout3Columns);
  registerSettingComponent('layout-3columns/setting', Layout3ColumnsSetting);
  registerWidgetStyleOption('layout-3columns', [
    {
      identifier: 'border',
      name: 'Border',
      cssStyle: `
      & > .dme-w-column1, & > .dme-w-column2{
        border-right: 1px solid #cccccc;
      }
    `,
    },
  ]);
};

export default register;
