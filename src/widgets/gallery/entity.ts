import { DMEData } from '../../core/types';

interface GalleryEntity {
  items: Array<{ image: string; title?: string }>;
  columns: number;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

const initGalleryEntity = (): GalleryEntity => ({
  items: [],
  columns: 3,
});

export { initGalleryEntity };
export type { GalleryEntity };
