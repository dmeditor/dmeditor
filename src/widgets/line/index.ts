import { HorizontalRuleOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget } from '../..';
import lineWidget from './definition';
import { Line } from './Line';

const register = () => {
  registerIcon({ name: 'line', component: HorizontalRuleOutlined });
  registerWidget(lineWidget, { render: Line });
};

export default register;
