import { DMEData } from '../../core/types';

export interface EntityButton {
  value: string;
  link: string;
  settings?: {
    textAlign?: 'left' | 'center' | 'right';
    general?: DMEData.GeneralSettingType;
  };
}
