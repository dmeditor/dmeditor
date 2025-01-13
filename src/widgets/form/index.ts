import { TextSnippetOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget, registerWidgetStyle } from '../..';
import formWidget from './definition';
import { Form } from './Form';
import Icon from './icon/icon.svg';

const register = () => {
  registerWidget(formWidget, { render: Form });
  registerIcon({ name: 'form', component: TextSnippetOutlined });
};

export default register;
