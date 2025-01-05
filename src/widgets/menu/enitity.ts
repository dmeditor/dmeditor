import { DMEData } from '../../core/types';

export interface EntityMenu {
  loadedMenu?: string; //from server
  menuList: Array<{ text: string; identifier: string; value: string }>;
  settings?: {
    color?: string;
    direction?: 'horizontal' | 'vertical';
    general?: DMEData.GeneralSettingType;
  };
}
