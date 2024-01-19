//Block entity, which is a node in the data tree
export type EntityBlock = {
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
export type EntityHeadingBlock = EntityBlock & {
    title: string,
    level: string,
    settings: {
        align: string,
        color?: string,
    }
}