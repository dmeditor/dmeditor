import { TabOutlined } from '@mui/icons-material';

import { registerIcon, registerSettingComponent, registerWidget } from '../..';
import SettingTabs from '../../core/components/reusable-setting/ListWithTitle';
import TabsWidget from './definition';
import Tabs from './Tabs';

export default () => {
  registerIcon({ name: 'tabs', component: TabOutlined });
  registerWidget(TabsWidget, {
    render: Tabs,
  });
  registerSettingComponent('tabs', SettingTabs);
};
