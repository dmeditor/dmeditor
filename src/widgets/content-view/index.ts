import { registerWidget } from 'dmeditor/core/utils';

import { ContentView } from './ContentView';
import { contentViewDefinition } from './definition';

const register = () => {
  registerWidget(contentViewDefinition, { render: ContentView });
};

export default register;
