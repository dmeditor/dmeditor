import { DMEData } from '../../core/types';

export interface EntityPopup {
  buttonText: string;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
