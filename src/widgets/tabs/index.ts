import { TabOutlined } from '@mui/icons-material';

import {
  registerIcon,
  registerSettingComponent,
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from '../..';
import SettingTabs from '../../core/components/reusable-setting/First';
import TabsWidget from './definition';
import Tabs from './Tabs';

export default () => {
  registerWidget(TabsWidget, {
    render: Tabs,
  });
  registerIcon({ name: 'tabs', component: TabOutlined });
  registerSettingComponent('tabs', SettingTabs);
};
