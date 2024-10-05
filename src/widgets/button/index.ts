import { registerIcon, registerWidget, registerWidgetStyle } from '../..';
import { Button } from './Button';
import buttonWidget from './definition';
import Icon from './icon/icon.svg';

const register = () => {
  registerWidget(buttonWidget, { render: Button });
  registerIcon({ name: 'button', component: Icon });
};

export default register;
export { Button };
