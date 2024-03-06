import { TabOutlined } from '@mui/icons-material';

import { registerWidget } from '..';
import { registerIcon } from '../../icon/icon-data';
import TabsWidget from './definition';
import DMTabs from './render';

export default () => {
  registerWidget(TabsWidget, { render: DMTabs });
  registerIcon({ name: 'tabs', component: TabOutlined });
};
