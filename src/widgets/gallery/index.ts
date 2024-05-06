import { registerSettingComponent, registerWidget } from 'dmeditor/index';

import GalleryDef from './definition';
import { Gallery } from './Gallery';
import { ImageList } from './settings/ImageList';

registerWidget(GalleryDef, { render: Gallery });
registerSettingComponent('image-list', ImageList);
