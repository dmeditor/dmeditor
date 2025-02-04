import { DMEData } from '../../core/types';

export interface EntityAccordion {
  multiOpen?: boolean;
  settings: {
    iconOnLeft?: boolean;
    general?: DMEData.GeneralSettingType;
  };
}

export interface AccordtionChildType extends DMEData.BlockWithChildren {
  meta?: { tabKey: string | number; title: string };
}
