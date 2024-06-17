import { DMEData } from '../../core/types/dmeditor';

export interface EntityLine {
  settings?: {
    height: number;
    color?: string;
    general?: DMEData.GeneralSettingType;
  };
}
