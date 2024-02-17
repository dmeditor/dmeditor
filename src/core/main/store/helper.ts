import { getWidget } from 'Components/widgets';
import { jsonParse } from 'Src/core/utils';
import { DMEData } from 'Src/core/components/types/block';


//todo: can these operation be object-orented way(for blocklist and block)?

//return a Block or null if not found
// todo: this can be improved by using cache(eg. using parent path so iterateBlockTree can iterate smartly :))
export const getBlockByID = (id: string, list: DMEData.BlockList): DMEData.Block | null => {
  let result =  null;
  iterateBlockList(list, (item)=>{
    if (item.id === id){
      result = item;
      return false;
    }
  })
  return result;
};

export const getChildList = (block: DMEData.Block): Array<DMEData.Block> =>{
  const result: Array<DMEData.Block> = [];
  iterateBlockTree(block, (item: DMEData.Block)=>{
    result.push(item);
  } )
  return result;
}


// iterate block list including their children
export const iterateBlockList = (blocklist: DMEData.BlockList, callback: (blockItem: DMEData.Block)=>boolean|void): boolean|void =>{
  for(const block of blocklist){
     const result = iterateBlockTree(block, callback);
     if(result === false){
       return false;
     }
  }
}

//iterate tree, including the root block. if return false, it means it breaks in the middle.
export const iterateBlockTree = (block: DMEData.Block, callback: (blockItem: DMEData.Block)=>boolean|void): boolean|void=> {
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
export const getChildByID = (id:string, block: DMEData.Block): DMEData.Block | null => {
    const children = block.children;
    if(children){
        return getBlockByID(id, children);
    }else{
        return null;
    }
}

//Insert before existing block
const insertBefore = (newBlock: DMEData.Block, existingBlock: DMEData.Block) =>{

}

//Insert after existing block
const insertAfter = (newBlock: DMEData.Block, existingBlock: DMEData.Block )=>{

}

//Add to last of parent block's list
const appendToParent = (newBlock: DMEData.Block, parent: DMEData.Block) =>{

}

//delete a block
const deleteBlock = (block:DMEData.Block )=>{

}

export const loadData = (data:string| DMEData.BlockList): DMEData.BlockList =>{
  let list: DMEData.BlockList = [];
  if (typeof data === 'string') {
   //todo: handle error
   list = jsonParse(data);
  }else{
    list = data;
  }
  // to do build working entity, eg. id, parent
  return list;
}


export const iteratePath = (pathArray:Array<number>, rootList: DMEData.BlockList, callback:(item:DMEData.Block, path:Array<number>)=>void ):void=>{
  let temp = rootList;
  pathArray.forEach((v, index)=>{
    const block = temp[v];
    const currentPath = pathArray.slice(0, index+1);
    callback(block, currentPath);
    temp = block.children||[];
  });
}

export const GetDataByPath = (data:DMEData.BlockList, path:Array<number>):DMEData.BlockList=>{
  let temp = data;
  let result: DMEData.Block = null;
  path.forEach((v, index)=>{
    const block = temp[v];
    if( index == path.length - 1 ){
      result = block;
    }
    temp = block.children||[];    
  });
  return result;
}

export const GetListByPath = (data:DMEData.BlockList, path:Array<number>):DMEData.BlockList|null=>{
  let list = data;
  if( path.length === 0 ){
    return data;
  }
  for (const i of path) {
    if( !list || !list[i] ){
      return null;
    }
    list = list[i].children || null;
  }
  return list;
}