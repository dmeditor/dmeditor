import { jsonParse } from 'Src/core/utils';
import { Data } from 'Src/core/components/types/blocktype';



//todo: can these operation be object-orented way(for blocklist and block)?

//return a Block or null if not found
// todo: this can be improved by using cache(eg. using parent path so iterateBlockTree can iterate smartly :))
export const getBlockByID = (id: string, list: Data.BlockList): Data.Block | null => {
  let result =  null;
  iterateBlockList(list, (item)=>{
    if (item.id === id){
      result = item;
      return false;
    }
  })
  return result;
};

export const getChildList = (block: Data.Block): Array<Data.Block> =>{
  const result: Array<Data.Block> = [];
  iterateBlockTree(block, (item: Data.Block)=>{
    result.push(item);
  } )
  return result;
}


// iterate block list including their children
export const iterateBlockList = (blocklist: Data.BlockList, callback: (blockItem: Data.Block)=>boolean|void): boolean|void =>{
  for(const block of blocklist){
     const result = iterateBlockTree(block, callback);
     if(result === false){
       return false;
     }
  }
}

//iterate tree, including the root block. if return false, it means it breaks in the middle.
export const iterateBlockTree = (block: Data.Block, callback: (blockItem: Data.Block)=>boolean|void): boolean|void=> {
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
export const getChildByID = (id:string, block: Data.Block): Data.Block | null => {
    const children = block.children;
    if(children){
        return getBlockByID(id, children);
    }else{
        return null;
    }
}

//Insert before existing block
const insertBefore = (newBlock: Data.Block, existingBlock: Data.Block) =>{

}

//Insert after existing block
const insertAfter = (newBlock: Data.Block, existingBlock: Data.Block )=>{

}

//Add to last of parent block's list
const appendToParent = (newBlock: Data.Block, parent: Data.Block) =>{

}

//delete a block
const deleteBlock = (block:Data.Block )=>{

}

export const loadData = (data:string| Data.BlockList): Data.BlockList =>{  
  let list: Data.BlockList = [];
  if (typeof data === 'string') {
   //todo: handle error
   list = jsonParse(data);
  }else{
    list = data;
  }
  // to do build working entity, eg. id, parent
  return list;
}