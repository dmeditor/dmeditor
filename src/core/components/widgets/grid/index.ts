import { GridViewOutlined } from '@mui/icons-material';

import { registerWidget } from '..';
import { registerIcon } from '../../icon/icon-data';
import gridWidget from './definition';
import { Grid } from './Grid';

const register = () => {
  registerWidget(gridWidget, Grid);
  registerIcon({ name: 'grid', component: GridViewOutlined });
};

export default register;
