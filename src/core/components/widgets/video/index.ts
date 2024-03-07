import { OndemandVideoOutlined } from '@mui/icons-material';
import { registerWidget } from 'dmeditor/components/widgets';

import { registerIcon } from '../../icon/icon-data';
import { Video, VideoDefinition } from './Video';

export default () => {
  registerWidget(VideoDefinition, Video);
  registerIcon({ name: 'video', component: OndemandVideoOutlined });
};
