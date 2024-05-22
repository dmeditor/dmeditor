import { ImageOutlined } from '@mui/icons-material';

import { registerIcon, registerSettingComponent, registerWidget } from '../..';
import { Image, ImageDefinition, Preview } from './Image';
import { Source } from './settings';

export default () => {
  registerWidget(ImageDefinition, { render: Image, preview: Preview });
  registerIcon({ name: 'image', component: ImageOutlined });
  registerSettingComponent('image-source', Source);
};
