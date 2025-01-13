import { RadioButtonChecked } from '@mui/icons-material';

import { registerIcon, registerWidget, registerWidgetStyle } from '../..';
import formWidget from './definition';
import { FormField } from './FormField';
import Icon from './icon/icon.svg';

const register = () => {
  registerWidget(formWidget, { render: FormField });
  registerIcon({ name: 'form-field', component: RadioButtonChecked });
};

export default register;
