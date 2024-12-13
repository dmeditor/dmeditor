import { DMEData } from '../../core/types/dmeditor';

export interface EntityContentView {
  view: string;
  dataSource?: DMEData.DataSourceData;
  content?: any;
  settings?: {
    general: DMEData.GeneralSettingType;
  };
}
