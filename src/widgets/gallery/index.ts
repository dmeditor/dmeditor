import CollectionsIcon from '@mui/icons-material/Collections';

import { registerIcon, registerSettingComponent, registerWidget } from '../..';
import GalleryDef from './definition';
import { Gallery } from './Gallery';
import { ImageList } from './settings/ImageList';

registerWidget(GalleryDef, { render: Gallery });
registerIcon({ name: 'gallery', component: CollectionsIcon });
registerSettingComponent('image-list', ImageList);
