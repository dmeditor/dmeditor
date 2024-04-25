import { ImageOutlined } from '@mui/icons-material';

import { registerIcon, registerSettingComponent, registerWidget } from '../../core';
import { Image, ImageDefinition } from './Image';
import { Source } from './settings';

export default () => {
  registerWidget(ImageDefinition, { render: Image });
  registerIcon({ name: 'image', component: ImageOutlined });
  registerSettingComponent('image-source', Source);
};
