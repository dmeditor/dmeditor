import { GridOnOutlined } from '@mui/icons-material';

import { registerWidget } from '..';
import { registerIcon } from '../../icon/icon-data';
import TableWidget from './definition';
import { TableBorderType, TableColumn, TableHeader, TableRow } from './settings';
import Table from './Table';
import { registerSettingComponent } from 'Core/setting-panel/property-setting';

export default () => {
  registerWidget(TableWidget, { render: Table });
  registerIcon({ name: 'table', component: GridOnOutlined });
  registerSettingComponent('table-border-type', TableBorderType);
  registerSettingComponent('table-column', TableColumn);
  registerSettingComponent('table-header', TableHeader);
  registerSettingComponent('table-row', TableRow);
};
