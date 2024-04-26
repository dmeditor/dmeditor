import { OndemandVideoOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget } from '../../core';
import { Video, VideoDefinition } from './Video';

export default () => {
  registerWidget(VideoDefinition, { render: Video });
  registerIcon({ name: 'video', component: OndemandVideoOutlined });
};
