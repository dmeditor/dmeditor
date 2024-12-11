import { DMEData } from '../../core/types';

export interface EntityMenu {
  defaultMenu?: string;
  parameterKey: string;
  menuList: Array<{ text: string; value: string }>;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
