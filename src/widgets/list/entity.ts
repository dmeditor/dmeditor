import { DMEData } from '../../core/types';

export interface EntityList {
  direction?: 'vertical' | 'horizontal';
  allowedTypes?: string[];
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
