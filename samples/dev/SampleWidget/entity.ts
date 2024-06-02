import { DMEData } from '../../../src';

/* Entity of a widget, which is the data format */
export interface EntitySampleWidget {
  text: string;
  settings: {
    width: number;
    backgroundColor?: string;
    general?: DMEData.GeneralSettingType;
  };
}
