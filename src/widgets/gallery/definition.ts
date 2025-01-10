import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, i18n } from '../..';
import { GalleryEntity, initGalleryEntity } from './entity';

const definition: DME.Widget = {
  category: 'media',
  icon: 'gallery',
  name: i18n('Gallery', 'widget'),
  type: 'gallery',
  events: {
    createBlock: (): DMEData.CreatedBlock<GalleryEntity> => {
      return {
        type: 'gallery',
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
      name: 'Items per page',
      property: '.itemsPerPage',
      settingComponent: 'number',
      description: 'Empty/0 mean no paginzation',
    },
    {
      name: 'Image gap',
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
