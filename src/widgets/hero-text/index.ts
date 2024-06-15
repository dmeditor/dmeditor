import { nanoid } from 'nanoid';

import type { DMEData } from '../..';
import { registerWidget, registerWidgetStyle, registerWidgetVariant } from '../..';
import heroTextWidget from './definition';
import { HeroText } from './HeroText';

const register = () => {
  registerWidget(heroTextWidget, { render: HeroText });
};

export default register;
