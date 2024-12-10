import { DMEData } from '../../core/types/dmeditor';

export interface EntityContentView {
  parameterKey: string;
  settings?: {
    general: DMEData.GeneralSettingType;
  };
}
