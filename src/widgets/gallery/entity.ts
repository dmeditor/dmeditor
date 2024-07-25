import { DMEData } from '../../core/types';

interface GalleryEntity {
  items: Array<{ image: string; title?: string }>;
  columns: number;
  itemsPerPage?: number;
  gap: number;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

const initGalleryEntity = (): GalleryEntity => ({
  items: [],
  columns: 3,
  gap: 10,
});

export { initGalleryEntity };
export type { GalleryEntity };
