import { CollectionsOutlined } from '@mui/icons-material';

import { registerIcon, registerSettingComponent, registerWidget } from '../..';
import GalleryDef from './definition';
import { Gallery } from './Gallery';
import { ImageList } from './settings/ImageList';

registerWidget(GalleryDef, { render: Gallery });
registerIcon({ name: 'gallery', component: CollectionsOutlined });
registerSettingComponent('image-list', ImageList);
