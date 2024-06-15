import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings } from '../..';
import { GalleryEntity, initGalleryEntity } from './entity';

const definition: DME.Widget = {
  category: 'media',
  icon: 'gallery',
  name: 'Gallery',
  type: 'gallery',
  events: {
    createBlock: (): DMEData.CreatedBlock<GalleryEntity> => {
      return {
        type: 'gallery',
        style: { _: 'default' },
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
      name: 'Gap between images',
      property: '.gap',
      settingComponent: 'range',
      parameters: { min: 0, max: 100 },
    },
    {
      name: '',
      property: '.items',
      custom: true,
      settingComponent: 'image-list',
    },
    ...generalSettings,
  ],
};

export default definition;
