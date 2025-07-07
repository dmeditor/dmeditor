import { SmartButtonOutlined } from '@mui/icons-material';
import { registerIcon, registerWidget } from 'dmeditor/core/utils';

import { moduleDefinition } from './definition';
import { Module } from './Module';

const register = () => {
  registerIcon({ name: 'module', component: SmartButtonOutlined });
  registerWidget(moduleDefinition, { render: Module });
};

export default register;
