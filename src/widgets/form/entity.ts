import { DMEData } from '../../core/types';

export interface EntityForm {
  formData?: boolean;
  formType: string;
  submitText?: string;
  resetText?: string;
  successMessage?: string;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
