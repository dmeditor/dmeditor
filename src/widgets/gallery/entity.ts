interface GalleryEntity {
  items: Array<{ image: string; title?: string }>;
  columns: number;
}

const initGalleryEntity = (): GalleryEntity => ({
  items: [],
  columns: 3,
});

export { initGalleryEntity };
export type { GalleryEntity };
