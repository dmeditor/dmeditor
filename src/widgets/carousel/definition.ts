import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig } from '../../core/config';
import { generalSettings } from '../../core/setting-panel/property-setting';
import { CarouselEntity, initCarouselEntity } from './entity';

const definition: DME.Widget = {
  category: 'widget',
  icon: 'carousel',
  name: 'Carousel',
  type: 'carousel',
  events: {
    createBlock: (): DMEData.Block<CarouselEntity> => {
      const defaultStyle = dmeConfig.widgets['carousel']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      return {
        id: nanoid(),
        type: 'carousel',
        style: { _: 'default' },
        // ...styleObj,
        data: initCarouselEntity(),
      };
    },
  },
  settings: [
    {
      name: 'Animation',
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
      name: 'Auto Play',
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
    // {
    //   name: '',
    //   property: '.children.meta',
    //   custom: true,
    //   settingComponent: 'carousel',
    // },
    ...generalSettings,
  ],
};

export default definition;
