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

/* Data type of block types */
export interface DataTable extends Array<Array<string|number>>{}

export interface DataFullImage{
    src: string,
    style: {
        padding: number,
        borderWidth: number,
        background: string
    }
}

export interface DataHeading{
    text: string,
    style: {
        level: number
    }
}

export interface DataTextMedia {
    text:string,
    media:{
        type: string,
        src: string,
        border?: number,
        width?: number,
        height?: number,
        align?:'left'|'right'
        //todo: define more
    }
}