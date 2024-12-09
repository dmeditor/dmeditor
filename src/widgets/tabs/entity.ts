import { DMEData } from '../../core/types';

export interface EntityTabsData {
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

export interface EntityTabsBlock extends DMEData.BlockWithChildren {
  meta: { tabKey: string | number; title: string };
}
