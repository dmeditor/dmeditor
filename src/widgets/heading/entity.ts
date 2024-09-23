import { DMEData } from '../../core/types';

export interface EntityHeadingBlock {
  value: string;
  level: number;
  anchor?: string;
  settings?: {
    align?: string;
    color?: string;
    general?: DMEData.GeneralSettingType;
  };
}
