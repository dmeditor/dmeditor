import { DMEData } from '../../../src';

/* Entity of a widget, which is the data format */
export interface EntitySampleWidget {
  text: string;
  settings: {
    width: number;
    insideBackground?: string;
    general?: DMEData.GeneralSettingType;
  };
}
