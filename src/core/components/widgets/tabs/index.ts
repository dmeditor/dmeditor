import { TabOutlined } from '@mui/icons-material';
import {
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from 'dmeditor/components/widgets';
import { registerSettingComponent } from 'dmeditor/setting-panel/property-setting';

import { registerIcon } from '../../icon/icon-data';
import TabsWidget from './definition';
import SettingTabs from './settings/SettingTabs';
import Tabs from './Tabs';

export default () => {
  registerWidget(TabsWidget, {
    render: Tabs,
  });
  registerIcon({ name: 'tabs', component: TabOutlined });
  registerSettingComponent('tabs', SettingTabs);
  registerWidgetStyleOption('tabs', [
    {
      identifier: 'default',
      name: 'Default',
      cssClasses: {
        root: 'bg-white',
        'nav-item': '-mb-px py-2 px-4 hover:bg-gray-200 cursor-pointer rounded-t border',
      },
      cssStyle: `
        .dme-w-nav-item{
          width: 100px;
        }
      `,
    },
  ]);
  registerWidgetStyle('tabs', {
    identifier: 'margin',
    name: 'Margin',
    display: 'inline-block',
    options: [
      {
        identifier: 'big-margin',
        name: 'Big',
        cssStyle: `
         margin-top: 50px;
         margin-bottom: 50px;
      `,
        icon: '',
      },
    ],
  });
};
