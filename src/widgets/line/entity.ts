import { DMEData } from '../../core/types/dmeditor';

export interface EntityLine {
  settings?: {
    height: number;
    color?: string;
    vertical?: boolean;
    general?: DMEData.GeneralSettingType;
  };
}
