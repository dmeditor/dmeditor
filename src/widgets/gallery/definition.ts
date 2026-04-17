import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import { GalleryEntity, initGalleryEntity } from './entity';

const definition: DME.Widget = {
  category: 'media',
  icon: 'gallery',
  get name() {
    return i18n('Gallery', 'widget');
  },
  type: 'gallery',
  editMask: true,
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
      get name() { return i18n('Columns per row', 'property-label'); },
      property: '.columns',
      settingComponent: 'range',
      parameters: { min: 1, max: 5 },
    },
    {
      get name() { return i18n('Items per page', 'property-label'); },
      property: '.itemsPerPage',
      settingComponent: 'number',
      description: 'Empty/0 mean no paginzation',
    },
    {
      get name() { return i18n('Image gap', 'property-label'); },
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
  ],
};

export default definition;
