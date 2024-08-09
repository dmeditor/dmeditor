import { registerWidget } from '../..';
import heroTextWidget from './definition';
import { HeroText } from './HeroText';

const register = () => {
  registerWidget(heroTextWidget, { render: HeroText });
};

export default register;
