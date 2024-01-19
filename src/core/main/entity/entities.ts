//Block entity, which is a node in the data tree
export interface EntityBlock {
    id: string,
    type: string,
    parent?: EntityBlock,
    children?: Array<EntityBlock>,
}

//Block list
export type EntityBlockList= Array<EntityBlock>;

//A section is alias of a block list
export type EntitySection= EntityBlock;


//example for heading
export interface EntityHeadingBlock extends EntityBlock {
    value: string,
    level: number,
    settings?: {
        align: string,
        color?: string,
    }
}