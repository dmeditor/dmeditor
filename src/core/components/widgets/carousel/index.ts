// import SettingCarousel from 'dmeditor/components/reusable-setting/First';
import { registerWidget, registerWidgetStyleOption } from 'dmeditor/components/widgets';
import { registerSettingComponent } from 'dmeditor/setting-panel/property-setting';

import Carousel from './carousel';
import definition from './definition';
import SettingCarousel from './settings/SettingCarousel';

export default () => {
  registerWidget(definition, {
    render: Carousel,
  });
  registerWidgetStyleOption('carousel', [
    {
      identifier: 'default',
      name: 'Default',
      cssClasses: {
        root: 'carousel',
        'w-full': 'w-full',
        'carousel-item': 'carousel-item',
        'carousel-inner': 'overflow-hidden relative w-full',
        'carousel-image': 'w-full max-h-80 min-h-48',
        // 'carsouel-item-start': ''
      },
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
