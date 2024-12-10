import { registerWidget } from 'dmeditor/core/utils';

import { menuDefinition } from './definition';
import { Menu } from './Menu';

const register = () => {
  registerWidget(menuDefinition, { render: Menu });
};

export default register;
