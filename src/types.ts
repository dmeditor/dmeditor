/* Block data type */

export interface BlockLayoutData{
    padding?: number,
    marginTop?: number,
    backgroundColor?:string
}

export interface BlockData{
    layout:BlockLayoutData,
    data: unknown, //depends on the block type
}

export interface BlockInfo{
    type: string
    content: BlockData
}
