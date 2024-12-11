import { registerWidget } from 'dmeditor/core/utils';

import { menuDefinition } from './definition';
import { Menu, serverSideLoad } from './Menu';

const register = () => {
  registerWidget(menuDefinition, { render: Menu, onServerSideLoad: serverSideLoad });
};

export default register;
