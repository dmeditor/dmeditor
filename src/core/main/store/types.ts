import type { DME, DMEData } from '../../types/dmeditor';

type AddBlockPosition = 'before' | 'after';

export interface AddBlockParameters {
  index: number;
  position: AddBlockPosition;
  context: Array<number | string>;
  status: 'started' | 'done';
  types?: Array<string> | string;
  isEmbed?: boolean;
}

export type Store = {
  selected: {
    blockId: string; //unique id
    blockIndex: number | string; //-Infinity if it's not selected
    //current blocklist path as context. Use getCurrentList to get current list data
    //eg. [0,1] means first on root level, second on second level
    currentListPath: Array<number | string>;
  };
  mode: DME.Mode;
  hoverPath?: Array<number | string>;
  addBlockData?: AddBlockParameters;
  storage: DMEData.BlockList; //data layer
  page: DMEData.Page;
  recentColors: Array<string>;
};

export type Actions = {
  startAddBlock: (
    context: Array<number | string>,
    index: number,
    position: AddBlockPosition,
    extraParams: { types?: Array<string> | string; isEmbed?: boolean },
  ) => void;
  //cancel adding dialog
  cancelAdding: () => void;
  updateHoverPath: (path: Array<number | string>) => void;
  clearAdding: () => void;
  addBlock: (type: string, addData?: { style?: string; savedBlock?: any }) => void;
  executeAdding: (
    context: Array<number | string>,
    index: number,
    position: AddBlockPosition,
    type: string,
    isEmbed: boolean,
    addData?: { style?: string; savedBlock?: any },
  ) => void;
  setMode: (mode: DME.Mode) => void;
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: DMEData.Block[] }) => void;
  getSelectedBlock: <T = DMEData.DefaultDataType>() => DMEData.Block<T> | undefined;
  removeBlock: (widget: DMEData.Block) => void;
  removeByPath: (path: Array<number | string>) => void;
  setSelected: (blockIndex?: number, context?: (string | number)[]) => void;
  setStorage: (data: DMEData.Block[]) => void;
  updateSelectedBlockIndex: (pathArray: Array<number | string>, id: string) => void;
  getCurrentList: () => DMEData.BlockList | DMEData.BlockMap | null;
  getCurrentBlock: () => DMEData.Block | null;
  getBlockByPath: (path: Array<number | string>) => DMEData.Block | null;
  getClosestBlock: (path: Array<number | string>) => [DMEData.Block, Array<number | string>] | [];
  getParents: (
    path: Array<number | string>,
  ) => Array<DMEData.Block & { path: Array<number | string> }>; //get parent Block from top to down, based on currentListPath
  updateBlockByPath: <Type = DMEData.DefaultDataType>(
    path: Array<number | string>,
    callback: (blockData: Type, block?: any) => void,
  ) => void;
  updateBlockPropsByPath: (
    path: Array<number | string>,
    propName: string,
    propValue: undefined | string | number | boolean | Array<unknown> | any,
  ) => void;
  updateSelectedBlock: <Type = DMEData.DefaultDataType>(
    callback: (blockData: Type, block?: any) => void,
  ) => void;
  updateSelectedBlockProps: (propName: string, propValue: string | number | Array<Object>) => void;
  updateSelectedBlockEditControl: (value: number) => void;
  updateBlockStyleByPath: (
    optionIdentifier: string,
    styleIdentifier: string,
    path: Array<number | string>,
  ) => void;
  toggleProperty: (status: boolean) => void;
  isSelected: () => boolean;
  updatePage: (value: string, key: string) => void;
  setPageData: (data: DMEData.Page) => void;
  insertBlock: (block: DMEData.Block, targetPath: Array<number | string>) => void;
  setCopyBlock: (block: DMEData.Block) => void;
  getCopyBlock: () => DMEData.Block | undefined;
  clearCopyBlock: () => void; //remove clipboard
  reset: () => void;
  getRecentColors: () => Array<string>;
  updateRecentColors: (color: string) => void;
};
