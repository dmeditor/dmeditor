import { ArticleOutlined } from '@mui/icons-material';
import { registerIcon, registerWidget } from 'dmeditor/core/utils';

import { ContentView, onServerLoad } from './ContentView';
import { contentViewDefinition } from './definition';

const register = () => {
  registerIcon({ name: 'content-view', component: ArticleOutlined });
  registerWidget(contentViewDefinition, { render: ContentView, onServerSideLoad: onServerLoad });
};

export default register;
