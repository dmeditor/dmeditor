import { registerWidget } from 'dmeditor/core/utils';

import { ContentView, onServerLoad } from './ContentView';
import { contentViewDefinition } from './definition';

const register = () => {
  registerWidget(contentViewDefinition, { render: ContentView, onServerSideLoad: onServerLoad });
};

export default register;
