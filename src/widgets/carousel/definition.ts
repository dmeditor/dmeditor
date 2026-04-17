import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import { CarouselEntity, initCarouselEntity } from './entity';

const definition: DME.Widget = {
  category: 'media',
  icon: 'carousel',
  get name() {
    return i18n('Carousel', 'widget');
  },
  type: 'carousel',
  events: {
    createBlock: (): DMEData.CreatedBlock<CarouselEntity> => {
      return {
        type: 'carousel',
        data: initCarouselEntity(),
      };
    },
  },
  settings: [
    {
      get name() {
        return i18n('Animation', 'property-label');
      },
      property: '.animation',
      settingComponent: 'select',
      parameters: {
        defaultValue: 'default',
        options: [
          { value: 'default', label: 'Fade' },
          // { value: 'slide', label: 'Slide' },
        ],
      },
    },
    {
      get name() {
        return i18n('Auto Play', 'property-label');
      },
      property: '.autoPlay',
      settingComponent: 'button-group',
      parameters: {
        options: [
          { value: true, text: 'Yes' },
          { value: false, text: 'No' },
        ],
      },
    },
    {
      name: '',
      property: '.items',
      custom: true,
      settingComponent: 'carousel',
    },
    {
      get name() {
        return i18n('Link on image', 'property-label');
      },
      property: '.linkOnImage',
      settingComponent: 'checkbox',
      description: 'Default is link on title.',
    },
    // {
    //   name: '',
    //   property: '.children.meta',
    //   custom: true,
    //   settingComponent: 'carousel',
    // },
  ],
};

export default definition;
