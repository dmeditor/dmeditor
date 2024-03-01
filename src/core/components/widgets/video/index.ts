import { OndemandVideoOutlined } from '@mui/icons-material';

import { registerIcon } from '../../icon/icon-data';
import { Video, VideoDefinition } from './Video';
import { registerWidget } from 'Core/components/widgets';

export default () => {
  registerWidget(VideoDefinition, Video);
  registerIcon({ name: 'video', component: OndemandVideoOutlined });
};
