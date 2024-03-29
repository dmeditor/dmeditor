import { registerSettingComponent } from 'dmeditor/setting-panel/property-setting';

import { registerWidget } from '..';
import TableWidget from './definition';
import { TableBorderType, TableColumn, TableHeader, TableRow } from './settings';
import Table from './Table';

const register = () => {
  registerWidget(TableWidget, { render: Table });
  registerSettingComponent('table-border-type', TableBorderType);
  registerSettingComponent('table-column', TableColumn);
  registerSettingComponent('table-header', TableHeader);
  registerSettingComponent('table-row', TableRow);
};

export default {
  widgetInfo: {
    name: 'Table',
    category: 'widget',
  },
  register,
};
