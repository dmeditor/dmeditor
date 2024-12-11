import { DMEData } from '../../core/types/dmeditor';

export interface EntityContentView {
  parameterKey: string;
  view: string;
  settings?: {
    general: DMEData.GeneralSettingType;
  };
}
