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

// Selection store types
export type SelectionState = {
  selected: {
    blockId: string;
    blockIndex: number | string;
    currentListPath: Array<number | string>;
  };
  hoverPath?: Array<number | string>;
};

export type SelectionActions = {
  setSelected: (blockIndex?: number, context?: (string | number)[]) => void;
  clearSelected: () => void;
  isSelected: () => boolean;
  updateSelectedBlockIndex: (pathArray: Array<number | string>, id: string) => void;
  updateHoverPath: (path: Array<number | string>) => void;
};

// Block operations store types
export type BlockOperationsState = {
  addBlockData?: AddBlockParameters;
};

export type BlockOperationsActions = {
  startAddBlock: (
    context: Array<number | string>,
    index: number,
    position: AddBlockPosition,
    extraParams: { types?: Array<string> | string; isEmbed?: boolean },
  ) => void;
  cancelAdding: () => void;
  clearAdding: () => void;
};

// Page store types
export type PageState = {
  page: DMEData.Page;
};

export type PageActions = {
  updatePage: (value: string, key: string) => void;
  setPageData: (data: DMEData.Page) => void;
};

// Color store types
export type ColorState = {
  recentColors: Array<string>;
};

export type ColorActions = {
  getRecentColors: () => Array<string>;
  updateRecentColors: (color: string) => void;
};

// Main store types (leaner - without moved state/actions)
export type Store = {
  selected: {
    blockId: string;
    blockIndex: number | string;
    currentListPath: Array<number | string>;
  };
  mode: DME.Mode;
  hoverPath?: Array<number | string>;
  addBlockData?: AddBlockParameters;
  storage: DMEData.BlockList;
  page: DMEData.Page;
  recentColors: Array<string>;
  eventListeners: Record<string, Array<(params?: unknown) => void>>;
};

export type Actions = {
  startAddBlock: (
    context: Array<number | string>,
    index: number,
    position: AddBlockPosition,
    extraParams: { types?: Array<string> | string; isEmbed?: boolean },
  ) => void;
  cancelAdding: () => void;
  updateHoverPath: (path: Array<number | string>) => void;
  clearAdding: () => void;
  addBlock: (type: string, addData?: { style?: string; savedBlock?: DMEData.Block }) => void;
  executeAdding: (
    context: Array<number | string>,
    index: number,
    position: AddBlockPosition,
    type: string,
    isEmbed: boolean,
    addData?: { style?: string; savedBlock?: DMEData.Block },
  ) => undefined | DMEData.Block;
  setMode: (mode: DME.Mode) => void;
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: DMEData.Block[] }) => void;
  getSelectedBlock: <T = DMEData.DefaultDataType>() => DMEData.Block<T> | undefined;
  removeBlock: (widget: DMEData.Block) => void;
  removeByPath: (path: Array<number | string>) => undefined | string;
  setSelected: (blockIndex?: number, context?: (string | number)[]) => void;
  setStorage: (data: DMEData.Block[]) => void;
  updateSelectedBlockIndex: (pathArray: Array<number | string>, id: string) => void;
  getCurrentList: () => DMEData.BlockList | DMEData.BlockMap | null;
  getCurrentBlock: () => DMEData.Block | null;
  getBlockByPath: (path: Array<number | string>) => DMEData.Block | null;
  getClosestBlock: (path: Array<number | string>) => [DMEData.Block, Array<number | string>] | [];
  getParents: (
    path: Array<number | string>,
  ) => Array<DMEData.Block & { path: Array<number | string> }>;
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
  clearCopyBlock: () => void;
  reset: () => void;
  getRecentColors: () => Array<string>;
  updateRecentColors: (color: string) => void;
  subscribeEvent: (event: string, listener: (params?: unknown) => void) => void;
  unsubscribeEvent: (event: string, listener: (params?: unknown) => void) => void;
  clearEventListeners: () => void;
  emitEvent: (event: string, params?: unknown) => void;
};
