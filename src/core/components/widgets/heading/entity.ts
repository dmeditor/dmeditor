import { DMEData } from '../../types/blocktype';

export interface EntityHeadingBlock extends DMEData.Block {
  type: 'heading';
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
