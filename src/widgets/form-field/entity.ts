import { DMEData } from '../../core/types';
import { Required } from './../../core/setting-panel/style';

export interface EntityFormField {
  label: string;
  identifier: string;
  required?: boolean;
  type: 'text' | 'checkbox' | 'select' | 'textarea' | 'number' | 'radio';
  options?: Array<Record<string, string | boolean>>;
  rows?: number;
  placeHolder?: string;
  newLine?: boolean;
  defaultValue?: string | number;
  settings?: {
    labelWidth?: string | number;
    general?: DMEData.GeneralSettingType;
  };
}
