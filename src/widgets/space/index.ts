import { registerIcon, registerWidget } from '../..';
import spaceWidget from './definition';
import { Space } from './Space';

const register = () => {
  registerWidget(spaceWidget, { render: Space });
};

export default register;
