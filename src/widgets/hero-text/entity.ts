import type { DMEData } from '../../core/types';

export interface EntityHeroText {
  heroPosition?: 'left' | 'right';
  heroFullWidth?: boolean;
  gap?: number;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

export interface EntityHeroTextChildren {
  hero: DMEData.Block;
  list: DMEData.Block;
}
