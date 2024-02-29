import { OndemandVideoOutlined } from '@mui/icons-material';

import { registerIcon } from '../../icon/icon-data';
import { Video, VideoDefinition, VideoSource } from './Video';
import { registerWidget } from 'Core/components/widgets';
import { registerSettingComponent } from 'Core/setting-panel/property-setting';

export default () => {
  registerWidget(VideoDefinition, Video);
  registerIcon({ name: 'video', component: OndemandVideoOutlined });
  registerSettingComponent('video-source', VideoSource);
};
