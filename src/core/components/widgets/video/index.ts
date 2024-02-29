import { Video, VideoDefinition, VideoSource } from './Video';
import { registerWidget } from 'Core/components/widgets';
import { registerSettingComponent } from 'Core/setting-panel/property-setting';

export default () => {
  registerWidget(VideoDefinition, Video);
  registerSettingComponent('video-source', VideoSource);
};
