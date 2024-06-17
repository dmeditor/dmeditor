import { HorizontalRuleOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget } from '../..';
import spaceWidget from './definition';
import { Space } from './Space';

const register = () => {
  registerIcon({ name: 'line', component: HorizontalRuleOutlined });
  registerWidget(spaceWidget, { render: Space });
};

export default register;
