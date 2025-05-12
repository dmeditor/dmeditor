import { DMEData } from '../../core/types';

export interface EntityGrid {
  columns: number;
  mobileColumns?: number;
  gap?: number;
  settings?: {
    itemPosition?: 'top' | 'middle' | 'bottom';
    general?: DMEData.GeneralSettingType;
  };
}
