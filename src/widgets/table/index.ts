import { GridOnOutlined } from '@mui/icons-material';

import { registerIcon, registerSettingComponent, registerWidget } from '../..';
import TableWidget from './definition';
import { TableBorderType, TableColumn, TableHeader, TableRow } from './settings';
import Table from './Table';

export default () => {
  registerWidget(TableWidget, { render: Table });
  registerIcon({ name: 'table', component: GridOnOutlined });
  registerSettingComponent('table-border-type', TableBorderType);
  registerSettingComponent('table-column', TableColumn);
  registerSettingComponent('table-header', TableHeader);
  registerSettingComponent('table-row', TableRow);
};
