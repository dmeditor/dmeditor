import { Data } from "../../types/blocktype";

export interface EntityHeadingBlock extends DMEData.Block {
    type: 'Heading',
    value: string,
    level: number,
    settings?: {
        align: string,
        color?: string,
    }
  }