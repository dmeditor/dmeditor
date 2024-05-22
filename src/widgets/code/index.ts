import { Code as CodeIcon } from '@mui/icons-material';

import { registerIcon, registerSettingComponent, registerWidget } from '../..';
import { Code } from './Code';
import CodeDef from './definition';
import { CodeInput } from './settings/codeInput';

registerWidget(CodeDef, { render: Code });
registerIcon({ name: 'code', component: CodeIcon });
registerSettingComponent('codeInput', CodeInput);
