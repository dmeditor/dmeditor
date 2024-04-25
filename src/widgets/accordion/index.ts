import SettingAccordion from 'dmeditor/components/reusable-setting/First';
import { registerWidget } from 'dmeditor/components/widgets';
import { registerSettingComponent } from 'dmeditor/setting-panel/property-setting';

import Accordion from './Accordion';
import definition from './definition';

export default () => {
  registerWidget(definition, {
    render: Accordion,
  });
  registerSettingComponent('accordion', SettingAccordion);
};
