import { registerWidget } from '..';
import { registerIcon } from '../../icon/icon-data';
import TextDefinition from './definition';
import Icon from './icon/text.svg';
import Text from './Text';

const registerdText = () => {
  registerWidget(TextDefinition, { render: Text });
  registerIcon({ name: 'text', component: Icon });
};
export default registerdText;
export { Text };
