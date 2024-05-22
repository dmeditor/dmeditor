import { Code as CodeIcon } from '@mui/icons-material';

import { registerIcon, registerWidget } from '../..';
import { Code } from './Code';
import CodeDef from './definition';

registerWidget(CodeDef, { render: Code });
registerIcon({ name: 'code', component: CodeIcon });
