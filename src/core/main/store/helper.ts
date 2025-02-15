import { ContextPathType } from 'dmeditor/core/config';

import type { DMEData } from '../../types/dmeditor';
import { convertStyleDataToArray, getWidget, jsonParse } from '../../utils';

//todo: can these operation be object-orented way(for blocklist and block)?

//return a Block or null if not found
// todo: this can be improved by using cache(eg. using parent path so iterateBlockTree can iterate smartly :))
export const getBlockByID = (id: string, list: DMEData.BlockList): DMEData.Block | null => {
  let result = null;
  iterateBlockList(list, (item) => {
    if (item.id === id) {
      result = item;
      return false;
    }
  });
  return result;
};

export const getChildList = (block: DMEData.Block): Array<DMEData.Block> => {
  const result: Array<DMEData.Block> = [];
  iterateBlockTree(block, (item: DMEData.Block) => {
    result.push(item);
  });
  return result;
};

// iterate block list including their children
export const iterateBlockList = (
  blocklist: DMEData.BlockList,
  callback: (blockItem: DMEData.Block) => boolean | void,
): boolean | void => {
  for (const block of blocklist) {
    const result = iterateBlockTree(block, callback);
    if (result === false) {
      return false;
    }
  }
};

//iterate tree, including the root block. if return false, it means it breaks in the middle.
export const iterateBlockTree = (
  block: DMEData.Block,
  callback: (blockItem: DMEData.Block) => boolean | void,
): boolean | void => {
  const callbackResult = callback(block);
  if (callbackResult === false) {
    return false;
  }
  if (block.children) {
    if (Array.isArray(block.children)) {
      for (const item of block.children) {
        const itemResult = iterateBlockTree(item, callback);
        if (itemResult === false) {
          return false;
        }
      }
    } else if (typeof block.children === 'object') {
      for (const key of Object.keys(block.children as DMEData.BlockMap)) {
        const itemResult = iterateBlockTree(block.children[key], callback);
        if (itemResult === false) {
          return false;
        }
      }
    }
  }
};

//get children's block by id. Return null if not found
export const getChildByID = (id: string, block: DMEData.Block): DMEData.Block | null => {
  const children = block.children;
  if (children) {
    return getBlockByID(id, children);
  } else {
    return null;
  }
};

//Insert before existing block
const insertBefore = (newBlock: DMEData.Block, existingBlock: DMEData.Block) => {};

//Insert after existing block
const insertAfter = (newBlock: DMEData.Block, existingBlock: DMEData.Block) => {};

//Add to last of parent block's list
const appendToParent = (newBlock: DMEData.Block, parent: DMEData.Block) => {};

//delete a block
const deleteBlock = (block: DMEData.Block) => {};

export const loadData = (data: string | DMEData.BlockList): DMEData.BlockList => {
  let list: DMEData.BlockList = [];
  if (typeof data === 'string') {
    //todo: handle error
    list = jsonParse(data);
  } else {
    list = data;
  }
  // to do build working entity, eg. id, parent
  return list;
};

export const iteratePath = (
  pathArray: Array<number | string>,
  rootList: DMEData.BlockList,
  callback: (item: DMEData.Block, path: Array<number | string>) => void,
): void => {
  let temp: DMEData.BlockList | DMEData.BlockMap = rootList;
  pathArray.forEach((v, index) => {
    let block: DMEData.Block;
    if (Array.isArray(temp)) {
      block = temp[v as number];
    } else {
      block = temp[v as string];
    }
    const currentPath = pathArray.slice(0, index + 1);
    callback(block, currentPath);
    temp = block?.children || [];
  });
};

export const getDataByPath = (
  data: DMEData.BlockList | DMEData.BlockMap,
  path: Array<number | string>,
): DMEData.Block | null => {
  let temp = data;
  let result = null;
  path.forEach((v, index) => {
    let block: DMEData.Block;
    if (Array.isArray(temp)) {
      block = temp[v as number];
    } else {
      block = temp[v as string];
    }
    // find the deepest children ?
    // let targetIndex = index;
    // let targetList = listData;
    // while (targetList[targetIndex]?.children) {
    //   targetList = targetList[targetIndex].children ?? [];
    //   targetIndex = targetList.length - 1;
    // }
    if (!block) {
      return null;
    }
    if (index === path.length - 1) {
      result = block;
    }
    temp = block.children || [];
  });
  return result;
};

export const getListByPath = (
  data: DMEData.BlockList,
  path: Array<number | string>,
): DMEData.BlockList | null => {
  if (path.length === 0) {
    return data;
  }
  let listData = getDataByPath(data, path);
  return listData && listData.children ? (listData.children as DMEData.BlockList) : null;
};

export const getDependencyOptions = (widget: string, data: DMEData.BlockList) => {
  const def = getWidget(widget);
  const dependencyList = def.canDependentOn;
  if (dependencyList) {
    const result: DMEData.Block[] = [];
    iterateBlockList(data, (item) => {
      if (dependencyList.includes(item.type)) {
        result.push(item);
      }
    });
    return result;
  }
  return null;
};

//get path under mixed, with styles, if no mixed, the root is empty
export const getContextInMixed = (
  blockPath: Array<string | number>,
  storage: Array<DMEData.Block>,
) => {
  const mixedBlocks: Array<DMEData.Block> = [];
  const paths: Array<Array<string | number>> = [];
  //get all mixed widget blocks
  iteratePath(blockPath, storage, (item, path) => {
    if (!item.type) {
      return;
    }
    const widget = item.type;
    const widgetType = getWidget(widget).widgetType;
    if (widgetType === 'mixed') {
      mixedBlocks.push(item);
      paths.push(path);
    }
  });

  //get last mixed or null
  const mixedRoot = mixedBlocks.length > 0 ? mixedBlocks[mixedBlocks.length - 1] : null;

  const result: ContextPathType = [];
  if (mixedBlocks.length > 0 && mixedRoot) {
    const last = mixedBlocks.length - 1;
    const path = paths[last];
    const relativePath = blockPath.slice(path.length);
    iteratePath([0, ...relativePath], [mixedRoot], (item, path) => {
      if (path.length > 1) {
        //ignore root
        result.push({
          pathKey: path[path.length - 1],
          block: item.type
            ? { type: item.type, styles: convertStyleDataToArray(item.style) }
            : undefined,
        });
      }
    });
  } else {
    iteratePath(blockPath, storage, (item, path) => {
      //ignore root
      result.push({
        pathKey: path[path.length - 1],
        block: { type: item.type, styles: convertStyleDataToArray(item.style) },
      });
    });
  }

  return { root: mixedRoot, path: result };
};
