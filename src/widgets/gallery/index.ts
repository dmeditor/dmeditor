import { registerWidget } from 'dmeditor/index';

import GalleryDef from './definition';
import { Gallery } from './Gallery';

registerWidget(GalleryDef, { render: Gallery });
