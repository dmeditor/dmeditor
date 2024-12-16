import { DMEData } from '../../core/types';

export interface EntityMenu {
  defaultMenu?: string;
  menuList: Array<{ text: string; identifier: string; value: string }>;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}
