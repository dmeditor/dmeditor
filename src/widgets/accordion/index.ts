// import { registerSettingComponent, registerWidget } from '../../core';
import SettingAccordion from '../../core/components/reusable-setting/First';
import { registerSettingComponent } from '../../core/setting-panel/register';
import { registerWidget } from '../../core/utils';
import Accordion from './Accordion';
import definition from './definition';

export default () => {
  registerWidget(definition, {
    render: Accordion,
  });
  registerSettingComponent('accordion', SettingAccordion);
};
