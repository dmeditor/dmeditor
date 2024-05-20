import { DMEData } from '../../core/types';

export interface EntityButton {
  value: string;
  link: string;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
