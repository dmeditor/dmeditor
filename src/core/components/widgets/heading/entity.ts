import { DMEData } from '../../types/blocktype';

export interface EntityHeadingBlock extends DMEData.BlockData {
  value: string;
  level: number;
  settings?: {
    align: string;
    color?: string;
    'background-color'?: string,
    'margin-top'?: number,
    padding?:number,
    width?: string|number,
  };
}
