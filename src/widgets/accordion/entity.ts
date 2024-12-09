import { DMEData } from '../../core/types';

export interface EntityAccordion {
  settings: {
    general?: DMEData.GeneralSettingType;
  };
}

export interface AccordtionChildType extends DMEData.BlockWithChildren {
  meta?: { tabKey: string | number; title: string };
}
