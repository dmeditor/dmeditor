import { registerSettingComponent, registerWidget } from '../../core';
import SettingAccordion from '../../core/components/reusable-setting/First';
import Accordion from './Accordion';
import definition from './definition';

export default () => {
  console.log(definition, registerWidget);
  registerWidget(definition, {
    render: Accordion,
  });
  registerSettingComponent('accordion', SettingAccordion);
};
