import { SmartButtonOutlined } from '@mui/icons-material';
import { registerIcon, registerWidget } from 'dmeditor/core/utils';

import definition from '../carousel/definition';
import { popupDefinition } from './definition';
import { Popup } from './Popup';

const register = () => {
  registerIcon({ name: 'popup', component: SmartButtonOutlined });
  registerWidget(popupDefinition, { render: Popup });
};

export default register;
