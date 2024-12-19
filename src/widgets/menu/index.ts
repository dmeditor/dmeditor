import { MenuOutlined } from '@mui/icons-material';
import { registerIcon, registerWidget } from 'dmeditor/core/utils';

import { menuDefinition } from './definition';
import { Menu, serverSideLoad } from './Menu';

const register = () => {
  registerIcon({ name: 'menu', component: MenuOutlined });
  registerWidget(menuDefinition, { render: Menu, onServerSideLoad: serverSideLoad });
};

export default register;
