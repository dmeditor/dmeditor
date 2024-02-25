import { registerWidget } from '..';
import TextDefinition from './definition';
import Text from './Text';

const registerdText = () => {
  registerWidget(TextDefinition, Text);
};
export default registerdText;
export { Text };
