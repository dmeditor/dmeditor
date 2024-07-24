import { DMEData } from '../../core/types';

export interface EntityTabsData {
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

export interface EntityTabsBlock {
  meta: { tabKey: string | number; title: string };
}
