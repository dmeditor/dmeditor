import { DMEData } from '../../core/types';

export interface EntityHeadingBlock {
  value: string;
  level: number;
  settings?: {
    align: string;
    color?: string;
    backgroundColor: string;
    marginTop?: number;
    padding?: number;
    width?: string | number;
    general?: DMEData.GeneralSettingType;
  };
}
