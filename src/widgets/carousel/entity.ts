import { DMEData } from '../../core/types';

interface CarouselEntity {
  animation: 'default' | 'fade';
  autoPlay: boolean;
  items: Array<{ link: string; image: string; title?: string }>;
  linkOnImage?: boolean;
  settings: {
    general?: DMEData.GeneralSettingType;
  };
}

const initCarouselEntity = (): CarouselEntity => ({
  animation: 'default',
  autoPlay: true,
  items: [
    {
      link: 'https://www.google.com',
      image:
        'https://bridge.site.digimaker.com/var/images/z/zip/upload-918282482-carousel_image.jpg',
      title: '',
    },
    // {
    //   link: 'https://www.google.com',
    //   image:
    //     'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=164&h=164&fit=crop&auto=format&dpr=2',
    //   title: 'Premium Coffee',
    // },
    {
      link: 'https://www.google.com',
      image:
        'https://bridge.site.digimaker.com/var/images/f/fbq/upload-295610395-voksen_kirke1.jpg',
      title: '',
    },
  ],
});

export { initCarouselEntity };
export type { CarouselEntity };
