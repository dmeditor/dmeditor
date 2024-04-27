import { registerIcon, registerWidget, registerWidgetStyle } from '../..';
import { Button } from './Button';
import buttonWidget from './definition';
import Icon from './icon/icon.svg';

const register = () => {
  registerWidget(buttonWidget, { render: Button });
  registerIcon({ name: 'button', component: Icon });
  registerWidgetStyle('button', {
    identifier: 'type',
    display: 'inline-block',
    name: 'Type',
    options: [
      {
        identifier: 'primary',
        name: 'Primary',
        cssClasses: { root: 'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' },
        cssStyle: '',
      },
      {
        identifier: 'cancel',
        name: 'Cancel',
        cssClasses: { root: 'bg-gray-100 hover:bg-gray-500 hover:text-white py-1 px-4 rounded' },
        cssStyle: '',
      },
    ],
  });
  registerWidgetStyle('button', {
    identifier: 'size',
    display: 'inline-block',
    name: 'Size',
    options: [
      {
        identifier: 'small',
        name: 'Small',
        cssClasses: { root: 'py-1 px-4' },
        cssStyle: '',
      },
      {
        identifier: 'medium',
        name: 'Medium',
        cssClasses: { root: 'py-2 px-4' },
        cssStyle: '',
      },
      {
        identifier: 'large',
        name: 'Large',
        cssClasses: { root: 'py-3 px-6' },
        cssStyle: '',
      },
    ],
  });
};

export default register;
export { Button };
