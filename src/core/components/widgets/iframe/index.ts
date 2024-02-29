import { RestorePageOutlined } from '@mui/icons-material';

import { registerIcon } from '../../icon/icon-data';
import { IFrame, iFrameDefinition } from './IFrame';
import { registerWidget } from 'Core/components/widgets';

export default () => {
  registerWidget(iFrameDefinition, IFrame);
  registerIcon({ name: 'iframe', component: RestorePageOutlined });
};
