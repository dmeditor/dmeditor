import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig } from '../../core/config';
import { GalleryEntity, initGalleryEntity } from './entity';

const definition: DME.Widget = {
  category: 'widget',
  icon: 'gallery',
  name: 'Gallery',
  type: 'gallery',
  events: {
    createBlock: (): DMEData.Block<GalleryEntity> => {
      const defaultStyle = dmeConfig.widgets['gallery']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      return {
        id: nanoid(),
        type: 'gallery',
        style: { _: 'default' },
        // ...styleObj,
        data: initGalleryEntity(),
      };
    },
  },
  settings: [
    {
      name: 'Columns per row',
      property: '.columns',
      settingComponent: 'range',
      parameters: { min: 1, max: 5 },
    },
    {
      name: '',
      property: '.items',
      custom: true,
      settingComponent: 'image-list',
    },
  ],
};

export default definition;
