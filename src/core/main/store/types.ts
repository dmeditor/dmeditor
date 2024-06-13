import type { DME, DMEData } from '../../types/dmeditor';

type AddBlockPosition = 'before' | 'after';

export interface AddBlockParameters {
  index: number;
  position: AddBlockPosition;
  context: Array<number>;
  status: 'started' | 'done';
  types?: Array<string> | string;
}

export type Store = {
  selected: {
    blockId: string; //unique id
    blockIndex: number; //-Infinity if it's not selected
    //current blocklist path as context. Use getCurrentList to get current list data
    //eg. [0,1] means first on root level, second on second level
    currentListPath: Array<number>;
  };
  mode: DME.Mode;
  copyBlock?: DMEData.Block;
  hoverPath?: Array<number>;
  addBlockData?: AddBlockParameters;
  storage: DMEData.BlockList; //data layer
  page: DMEData.Page;
};

export type Actions = {
  startAddBlock: (
    context: Array<number>,
    index: number,
    position: AddBlockPosition,
    types?: Array<string> | string,
  ) => void;
  cancelAdding: () => void;
  updateHoverPath: (path: Array<number>) => void;
  clearAdding: () => void;
  addBlock: (type: string, addData?: { style?: string; savedBlock?: any }) => void;
  executeAdding: (
    context: Array<number>,
    index: number,
    position: AddBlockPosition,
    type: string,
    addData?: { style?: string; savedBlock?: any },
  ) => void;
  setMode: (mode: DME.Mode) => void;
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: DMEData.Block[] }) => void;
  getSelectedBlock: <T = DMEData.DefaultDataType>() => DMEData.Block<T> | undefined;
  getBlock: <T = DMEData.Block<DMEData.DefaultDataType>>(
    index: number,
  ) => DMEData.Block<T> | undefined;
  removeBlock: (widget: DMEData.Block) => void;
  removeByPath: (path: Array<number>) => void;
  setSelected: (blockIndex?: number) => void;
  setStorage: (data: DMEData.Block[]) => void;
  updateSelectedBlockIndex: (pathArray: Array<number>, id: string) => void;
  getCurrentList: () => DMEData.BlockList | null;
  getCurrentBlock: () => DMEData.Block | null;
  getBlockByPath: (path: Array<number>) => DMEData.Block;
  getClosestBlock: (path: Array<number>) => [DMEData.Block, Array<number>] | [];
  getParents: (path: Array<number>) => Array<DMEData.Block & { path: Array<number> }>; //get parent Block from top to down, based on currentListPath
  updateBlockByPath: <Type = DMEData.DefaultDataType>(
    path: Array<number>,
    callback: (blockData: Type, block?: any) => void,
  ) => void;
  updateBlockPropsByPath: (
    path: Array<number>,
    propName: string,
    propValue: undefined | string | number | boolean | Array<Object>,
  ) => void;
  updateSelectedBlock: <Type = DMEData.DefaultDataType>(
    callback: (blockData: Type, block?: any) => void,
  ) => void;
  updateSelectedBlockProps: (propName: string, propValue: string | number | Array<Object>) => void;
  updateSelectedBlockEditControl: (value: number) => void;
  updateBlockStyleByPath: (
    optionIdentifier: string,
    styleIdentifier: string,
    path: Array<number>,
  ) => void;
  toggleProperty: (status: boolean) => void;
  isSelected: () => boolean;
  updatePage: (value: string, key: string) => void;
  setPageData: (data: DMEData.Page) => void;
  moveTo: (block: DMEData.Block, targetPath: Array<number>) => void;
  setCopyBlock: (block: DMEData.Block) => void;
  getCopyBlock: () => DMEData.Block | undefined;
  reset: () => void;
};
