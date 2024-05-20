import { DMEData } from '../../core/types';

export interface EntityTabsData {
  data: {};
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

export interface EntityTabsBlock {
  meta: { tabKey: string; title: string };
}
