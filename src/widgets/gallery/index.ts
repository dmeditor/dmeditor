import { registerSettingComponent, registerWidget } from '../..';
import GalleryDef from './definition';
import { Gallery } from './Gallery';
import { ImageList } from './settings/ImageList';

registerWidget(GalleryDef, { render: Gallery });
registerSettingComponent('image-list', ImageList);
