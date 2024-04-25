import { DMEData } from 'dmeditor/types';

export interface EntityHeadingBlock {
  value: string;
  level: number;
  settings?: {
    align: string;
    color?: string;
    backgroundColor: string;
    marginTop?: number;
    padding?: number;
    width?: string | number;
  };
}
