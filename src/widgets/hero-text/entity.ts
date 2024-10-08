import type { DMEData } from '../../core/types';

export interface EntityHeroText {
  heroPosition?: 'left' | 'right';
  heroFullWidth?: boolean;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
