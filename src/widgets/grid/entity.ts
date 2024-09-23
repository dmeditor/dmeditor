import { DMEData } from '../../core/types';

export interface EntityGrid {
  columns: number;
  gap?: number;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
