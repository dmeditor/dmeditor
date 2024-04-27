import { RestorePageOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget } from '../..';
import { IFrame, iFrameDefinition } from './IFrame';

export default () => {
  registerWidget(iFrameDefinition, { render: IFrame });
  registerIcon({ name: 'iframe', component: RestorePageOutlined });
};
