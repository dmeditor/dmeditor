import { initialTextEntity } from '../text/entity';

type TableValue = any[][];
export type BorderType = 'none' | 'rowBorder' | 'border';

export interface EntityTableBlock {
  value: TableValue; //array of rows, each row is an array of cells
  settings: {
    borderType?: BorderType;
    padding?: number;
    borderColor?: string;
    oddRowBackground?: string;
    hasHeader?: boolean;
    headerIsBold?: boolean;
    headerAlign?: 'left' | 'center' | 'right';
    headerBackground?: string;
  };
}

export const initialTableEntity = (): Pick<EntityTableBlock, 'value'> => {
  return {
    value: [
      [initialTextEntity(), initialTextEntity()],
      [initialTextEntity(), initialTextEntity()],
    ],
  };
};
