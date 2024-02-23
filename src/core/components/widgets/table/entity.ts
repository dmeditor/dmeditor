import { DMEData } from 'Core/index';

type TableValue = any[][];
export type BorderType = 'none' | 'rowBorder' | 'border';

export interface EntityTableBlock {
  value: TableValue; //array of rows, each row is an array of cells
  activeCellIndex: [number, number];
  settings: {
    'border-type'?: BorderType;
    'border-color'?: string;
    'odd-row-background'?: string;
    'has-header'?: boolean;
    'is-bold'?: boolean;
    'header-align'?: 'left' | 'center' | 'right';
    'header-background'?: string;
  };
}
