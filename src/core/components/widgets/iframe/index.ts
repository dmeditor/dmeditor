import { RestorePageOutlined } from '@mui/icons-material';
import { registerWidget } from 'dmeditor/components/widgets';

import { registerIcon } from '../../icon/icon-data';
import { IFrame, iFrameDefinition } from './IFrame';

export default () => {
  registerWidget(iFrameDefinition, IFrame);
  registerIcon({ name: 'iframe', component: RestorePageOutlined });
};
