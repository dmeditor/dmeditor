import TabIcon from '@mui/icons-material/Tab';

import {
  registerIcon,
  registerSettingComponent,
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from '../..';
import SettingTabs from '../../core/components/reusable-setting/ListWithTitle';
import TabsWidget from './definition';
import Tabs from './Tabs';

export default () => {
  registerIcon({ name: 'tabs', component: TabIcon });
  registerWidget(TabsWidget, {
    render: Tabs,
  });
  registerSettingComponent('tabs', SettingTabs);
};
