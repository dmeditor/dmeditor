import { DMEData } from '../../core/types';

export interface EntityMenu {
  defaultMenu?: string;
  parameterKey: string;
  menuList: Array<{ text: string; identifier: string }>;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
