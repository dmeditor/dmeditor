import { DMEData } from '../../core/types';

export interface EntityList {
  direction?: 'vertical' | 'horizontal';
  itemGap?: number;
  allowedTypes?: string[];
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
