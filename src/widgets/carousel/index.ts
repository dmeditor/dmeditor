import { CollectionsOutlined } from '@mui/icons-material';

import { registerIcon, registerWidget, registerWidgetStyleOption } from '../..';
import { registerSettingComponent } from '../../core/setting-panel/register';
import Carousel from './Carousel';
import definition from './definition';
import SettingCarousel from './settings/SettingCarousel';

export default () => {
  registerIcon({ name: 'carousel', component: CollectionsOutlined });
  registerWidget(definition, {
    render: Carousel,
  });
  registerWidgetStyleOption('carousel', [
    {
      identifier: 'default',
      name: 'Default',
      // cssClasses: {
      //   root: 'carousel',
      //   'w-full': 'w-full',
      //   'carousel-item': 'carousel-item',
      //   'carousel-inner': 'overflow-hidden relative w-full',
      //   'carousel-image': 'w-full max-h-80 min-h-48',
      // },
      cssStyle: `
        .carousel-item.active,.carousel-item-next,.carousel-item-prev {
          display: block;
        }
        .active.carousel-item-end,.carousel-item-next:not(.carousel-item-start) {
          transform: translateX(100%)
        }

        .active.carousel-item-start,.carousel-item-prev:not(.carousel-item-end) {
          transform: translateX(-100%)
        }
      `,
    },
  ]);
  registerSettingComponent('carousel', SettingCarousel);
};
