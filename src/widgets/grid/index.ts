import { GridViewOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget } from '../../core';
// import { registerIcon, registerWidget } from '../../core/utils';
import gridWidget from './definition';
import { Grid } from './Grid';

const register = () => {
  registerWidget(gridWidget, { render: Grid });
  registerIcon({ name: 'grid', component: GridViewOutlined });
};

export default register;
