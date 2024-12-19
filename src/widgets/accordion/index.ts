import { ViewListOutlined } from '@mui/icons-material';

import { registerIcon, registerSettingComponent, registerWidget } from '../..';
import SettingAccordion from '../../core/components/reusable-setting/ListWithTitle';
import Accordion from './Accordion';
import definition from './definition';

export default () => {
  registerIcon({ name: 'accordion', component: ViewListOutlined });
  registerWidget(definition, {
    render: Accordion,
  });
  registerSettingComponent('accordion', SettingAccordion);
};
