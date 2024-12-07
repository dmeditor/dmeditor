import { registerWidget } from 'dmeditor/core/utils';

import definition from '../carousel/definition';
import { popupDefinition } from './definition';
import { Popup } from './Popup';

const register = () => {
  registerWidget(popupDefinition, { render: Popup });
};

export default register;
