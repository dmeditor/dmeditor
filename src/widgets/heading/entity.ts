// import type { DMEData } from '../../../core';

export interface EntityHeadingBlock {
  value: string;
  level: number;
  settings?: {
    align: string;
    color?: string;
    'background-color'?: string;
    'margin-top'?: number;
    padding?: number;
    width?: string | number;
  };
}
