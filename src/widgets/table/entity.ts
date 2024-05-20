import { DMEData } from '../../core/types';

type TableValue = any[][];
export type BorderType = 'none' | 'rowBorder' | 'border';

export interface EntityTableBlock {
  value: TableValue; //array of rows, each row is an array of cells
  settings: {
    borderType?: BorderType;
    padding?: number;
    borderColor?: string;
    color?: string;
    oddRowBackground?: string;
    hasHeader?: boolean;
    headerIsBold?: boolean;
    headerAlign?: 'left' | 'center' | 'right';
    headerBackground?: string;
    general?: DMEData.GeneralSettingType;
  };
}

export const initialTableEntity = (): Pick<EntityTableBlock, 'value'> => {
  return {
    value: [
      [null, null],
      [null, null],
    ],
  };
};
