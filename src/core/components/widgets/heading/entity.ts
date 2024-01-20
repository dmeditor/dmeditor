import { Data } from "../../types/blocktype";

export interface EntityHeadingBlock extends Data.Block {
    type: 'heading',
    value: string,
    level: number,
    settings?: {
        align: string,
        color?: string,
    }
  }