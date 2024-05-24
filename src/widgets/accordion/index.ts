import { registerSettingComponent, registerWidget } from '../..';
import SettingAccordion from '../../core/components/reusable-setting/ListWithTitle';
import Accordion from './Accordion';
import definition from './definition';

export default () => {
  registerWidget(definition, {
    render: Accordion,
  });
  registerSettingComponent('accordion', SettingAccordion);
};
