import { registerIcon, registerWidget } from '../../core';
import TextDefinition from './definition';
import Icon from './icon/text.svg';
import Text from './Text';

const registerdText = () => {
  registerWidget(TextDefinition, { render: Text });
  registerIcon({ name: 'text', component: Icon });
};
export default registerdText;
export { Text };
