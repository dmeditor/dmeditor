import { ImageOutlined } from '@mui/icons-material';
import { registerWidget } from 'dmeditor/components/widgets';
import { registerSettingComponent } from 'dmeditor/setting-panel/property-setting';

import { registerIcon } from '../../icon/icon-data';
import { Image, ImageDefinition } from './Image';
import { Source } from './settings';

export default () => {
  registerWidget(ImageDefinition, { render: Image });
  registerIcon({ name: 'image', component: ImageOutlined });
  registerSettingComponent('image-source', Source);
};
