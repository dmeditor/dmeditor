// import { registerIcon, registerWidget } from '../../core';
import { registerIcon, registerWidget, registerWidgetStyleOption } from '../../core';
import IconHeading from './assets/svg/heading.svg';
import definition from './definition';
import Heading from './Heading';

const registerHeading = () => {
  // one way to register the icon
  // registerIcon({ name: 'dme-icon-heading', path: 'M0 0h24v24H0z', viewBox: '0 0 24 24' });
  // another way to register the icon
  registerWidget(definition, {
    render: Heading,
  });
  registerIcon({ name: 'ic-heading', component: IconHeading });
};

export { Heading };
export default registerHeading;
