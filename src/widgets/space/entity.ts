import { DMEData } from './../../core/types/dmeditor';

export interface EntitySpace {
  settings?: {
    height: number;
    background?: string;
    general?: DMEData.GeneralSettingType;
  };
}
