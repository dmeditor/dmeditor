interface GalleryEntity {
  items: Array<{ link: string; image: string; title?: string }>;
}

const initGalleryEntity = (): GalleryEntity => ({
  items: [
    {
      link: 'https://www.google.com',
      image:
        'https://bridge.site.digimaker.com/var/images/z/zip/upload-918282482-carousel_image.jpg',
    },
    {
      link: 'https://www.google.com',
      image:
        'https://bridge.site.digimaker.com/var/images/f/fbq/upload-295610395-voksen_kirke1.jpg',
    },
  ],
});

export { initGalleryEntity };
export type { GalleryEntity };
