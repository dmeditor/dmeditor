import { DMEData } from '../../core/types';

export interface EntityList {
  align?: 'left' | 'center' | 'right';
  direction?: 'vertical' | 'horizontal';
  allowedTypes?: string[];
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
