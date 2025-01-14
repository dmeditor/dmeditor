import { DMEData } from '../../core/types';

export interface EntityFormField {
  label: string;
  identifier: string;
  required?: boolean;
  type: 'text' | 'checkbox' | 'select' | 'textarea' | 'number' | 'datetime' | 'file' | 'radio';
  options?: Array<Record<string, string | boolean>>;
  rows?: number;
  placeHolder?: string;
  newLine?: boolean;
  params: {
    fileFormat?: string;
  };
  defaultValue?: string | number;
  settings?: {
    labelWidth?: string | number;
    general?: DMEData.GeneralSettingType;
  };
}
