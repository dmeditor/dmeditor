import { BlockList } from 'net';
import { EntityBlock, EntityBlockList, EntitySection} from './entities';
import { jsonParse } from 'Src/core/utils';

//return a Block or null if not found
// todo: this can be improved by using cache(eg. using parent path so iterateBlockTree can iterate smartly :))
export const getBlockByID = (id: string, list: EntityBlockList): EntityBlock | null => {
  let result =  null;
  iterateBlockList(list, (item)=>{
    if (item.id === id){
      result = item;
      return false;
    }
  })
  return result;
};

export const getChildList = (block: EntityBlock): Array<EntityBlock> =>{
  const result: Array<EntityBlock> = [];
  iterateBlockTree(block, (item: EntityBlock)=>{
    result.push(item);
  } )
  return result;
}


// iterate block list including their children
export const iterateBlockList = (blocklist: EntityBlockList, callback: (blockItem: EntityBlock)=>boolean|void): boolean|void =>{
  for(const block of blocklist){
     const result = iterateBlockTree(block, callback);
     if(result === false){
       return false;
     }
  }
}

//iterate tree, including the root block. if return false, it means it breaks in the middle.
export const iterateBlockTree = (block: EntityBlock, callback: (blockItem: EntityBlock)=>boolean|void): boolean|void=> {
  console.log(1111);
  const callbackResult = callback(block);
  if(callbackResult === false){
     return false
  }
  if(block.children){    
    for(const item of block.children){
       const itemResult = iterateBlockTree(item, callback );
       if(itemResult === false){
        return false;
       }
    }
  }
}

//get children's block by id. Return null if not found
export const getChildByID = (id:string, block: EntityBlock): EntityBlock | null => {
    const children = block.children;
    if(children){
        return getBlockByID(id, children);
    }else{
        return null;
    }
}

//Insert before existing block
const insertBefore = (newBlock: EntityBlock, existingBlock: EntityBlock) =>{

}

//Insert after existing block
const insertAfter = (newBlock: EntityBlock, existingBlock: EntityBlock )=>{

}

//Add to last of parent block's list
const appendToParent = (newBlock: EntityBlock, parent: EntityBlock) =>{

}

//delete a block
const deleteBlock = (block:EntityBlock )=>{

}

export const loadData = (data:string| EntityBlockList): EntityBlockList =>{  
  let list: EntityBlockList = [];
  if (typeof data === 'string') {
   //todo: handle error
   list = jsonParse(data);
  }
  // to do build working entity, eg. id, parent
  return list;
}