import { DMEData } from '../../core/types';

export interface EntityGrid {
  columns: number;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
