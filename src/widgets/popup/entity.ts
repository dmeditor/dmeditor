import { DMEData } from '../../core/types';

export interface EntityPopup {
  buttonText: string;
  modalSize?: 'small' | 'medium' | 'large';
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
