import type { ReactNode } from 'react';
import { isPlainObject } from 'lodash';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createDMEditor } from '..';
import type { DMEData } from '../../types/dmeditor';
import { isEmptyString, isKeyInObject, isStrictlyInfinity } from '../../utils';
import emitter from '../../utils/event';
import { getWidgetWithVariant, properties } from '../../utils/register';
import { getDataByPath, getListByPath, iteratePath } from './helper';

export type AddBlockPosition = 'before' | 'after';

export interface AddBlockParameters {
  index: number;
  position: AddBlockPosition;
  context: Array<number>;
  status: 'started' | 'done';
  types?: Array<string> | string;
}

type Store = {
  selected: {
    blockId: string; //unique id
    blockIndex: number; //-Infinity if it's not selected
    //current blocklist path as context. Use getCurrentList to get current list data
    //eg. [0,1] means first on root level, second on second level
    currentListPath: Array<number>;
  };
  copyBlock?: DMEData.Block;
  hoverPath?: Array<number>;
  addBlockData?: AddBlockParameters;
  storage: DMEData.BlockList; //data layer
  page: DMEData.Page;
};

type Actions = {
  startAddBlock: (
    context: Array<number>,
    index: number,
    position: AddBlockPosition,
    types?: Array<string> | string,
  ) => void;
  cancelAdding: () => void;
  updateHoverPath: (path: Array<number>) => void;
  clearAdding: () => void;
  addBlock: (type: string, style?: string) => void;
  executeAdding: (
    context: Array<number>,
    index: number,
    position: AddBlockPosition,
    type: string,
    style?: string,
  ) => void;
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
  getClosestBlock: (path: Array<number>) => DMEData.Block | null;
  getParents: () => Array<DMEData.Block & { path: Array<number> }>; //get parent Block from top to down, based on currentListPath
  updateBlockByPath: <Type = DMEData.DefaultDataType>(
    path: Array<number>,
    callback: (blockData: Type, block?: any) => void,
  ) => void;
  updateBlockPropsByPath: (
    path: Array<number>,
    propName: string,
    propValue: string | number | Array<Object>,
  ) => void;
  updateSelectedBlock: <Type = DMEData.DefaultDataType>(
    callback: (blockData: Type, block?: any) => void,
  ) => void;
  updateSelectedBlockProps: (propName: string, propValue: string | number | Array<Object>) => void;
  updateSelectedBlockEditControl: (value: number) => void;
  updateSelectedBlockStyle: (value: string, styleIdentifier: string) => void;
  toggleProperty: (status: boolean) => void;
  isSelected: () => boolean;
  updatePage: (value: string, key: string) => void;
  setPageData: (data: DMEData.Page) => void;
  moveTo: (block: DMEData.Block, targetPath: Array<number>) => void;
  setCopyBlock: (block: DMEData.Block) => void;
  getCopyBlock: () => DMEData.Block | undefined;
};

export const useEditorStore = create<Store & Actions>()(
  immer((set, get) => ({
    ...createDMEditor(),
    startAddBlock: (
      context: Array<number>,
      index: number,
      position: AddBlockPosition,
      types?: Array<string> | string,
    ) =>
      set((state) => {
        state.addBlockData = { context, index, position, status: 'started', types: types };
      }),
    addBlock: (type: string, style?: string) => {
      const state = get();
      if (!state.addBlockData) {
        return;
      }
      const { index, position, context } = state.addBlockData;

      state.executeAdding(context, index, position, type, style);
      set((state) => {
        if (state.addBlockData) {
          state.addBlockData.status = 'done';
        }
      });
    },
    executeAdding: (
      context: Array<number>,
      index: number,
      position: AddBlockPosition,
      type: string,
      style?: string,
    ) =>
      set((state) => {
        if (index == -Infinity) {
          return;
        }

        const [widget, variant] = getWidgetWithVariant(type);
        if (!widget) {
          return;
        }
        let blockData: any;
        if (variant) {
          blockData = variant.getDefaultData?.();
        } else {
          blockData = widget.events.createBlock();
        }
        if (style) {
          blockData.style = { _: style };
        }

        if (!blockData) {
          return;
        }

        const listData = getListByPath(state.storage, context || []);
        let newPosition: number = -Infinity;
        if (!listData) {
          return;
        }
        if (listData.length === 0) {
          listData.push(blockData);
          newPosition = 0;
        } else {
          if (index <= listData.length - 1 && position) {
            if (position === 'before') {
              listData.splice(index, 0, blockData);
              newPosition = index;
            } else if (position === 'after') {
              listData.splice(index + 1, 0, blockData);
              newPosition = index + 1;
            } else {
              console.warn('Invalid paraemter of adding. Ignored', index, position);
              return;
            }
          }
        }

        //update to new block
        state.selected.blockIndex = newPosition;
        state.selected.currentListPath = context;
      }),
    cancelAdding: () =>
      set((state) => {
        if (state.addBlockData) {
          const context = state.addBlockData.context;
          const parentList = getListByPath(state.storage, context);
          if (context.length > 0 && parentList && parentList.length === 0) {
            //todo: remove
            //  state.removeByPath(context);

            const parentContext = context.slice(0, context.length - 1);
            const list = getListByPath(state.storage, parentContext);
            if (!list) {
              return;
            }
            const parentIndex = context[context.length - 1];
            list.splice(parentIndex, 1);
          }
          state.addBlockData.status = 'done';
        }
      }),
    clearAdding: () => {
      set((state) => {
        state.addBlockData = undefined;
      });
    },
    clearWidgets: () => {
      set((state) => {
        // state.designer.selectedBlockIndex = -1;
        state.selected.blockIndex = -Infinity;
        state.storage = [];
      });
    },
    updateHoverPath: (path: Array<number>) => {
      set((state) => {
        state.hoverPath = path;
      });
    },
    getCurrentList: (): DMEData.BlockList | null => {
      const state = get();
      const currentPath = state.selected.currentListPath;
      return getListByPath(state.storage, currentPath);
    },
    getCurrentBlock: (): DMEData.Block | null => {
      const state = get();
      const list = state.getCurrentList();
      return list?.[state.selected.blockIndex] || null;
    },
    getBlockByPath: (path: Array<number>): DMEData.Block => {
      const state = get();
      return getDataByPath(state.storage, path) ?? { type: 'unknown', data: {} };
    },
    getClosestBlock: (path: Array<number>): DMEData.Block | null => {
      const state = get();

      if (path.length === 0) {
        return null;
      }

      let result = null;
      iteratePath(path, state.storage, (item) => {
        if (item.isEmbed) {
          return;
        }

        result = item;
      });

      return result;
    },
    getParents: (): Array<DMEData.Block & { path: Array<number> }> => {
      const state = get();
      const result: Array<DMEData.Block & { path: Array<number> }> = [];
      iteratePath(state.selected.currentListPath, state.storage, (item, path) => {
        result.push({ ...item, path: path });
      });
      return result;
    },
    clearSelected: () => {
      set((state) => {
        state.selected.blockIndex = -Infinity;
      });
    },
    isSelected: (): boolean => {
      const state = get();
      return state.selected.blockIndex !== -Infinity;
    },
    loadJsonSchema: (jsonSchema) => {
      set((state) => {
        let flag = false;
        if (!!jsonSchema && !!jsonSchema.widgets) {
          state.storage = jsonSchema.widgets;
          flag = true;
        }
        if (flag) {
          emitter.emit('loadJsonSchema', jsonSchema);
        }
        return flag;
      });
    },
    getSelectedBlock: <T>() => {
      const state = get();
      const selected = state.selected;
      if (selected.blockIndex === -Infinity) {
        return;
      }
      const result = state.getBlockByPath([...selected.currentListPath, selected.blockIndex]);
      if (result) {
        return result as DMEData.Block<T>;
      }
    },
    getBlock: <T>(index: number) => {
      const state = get();
      const currentList = state.getCurrentList();
      if (!currentList) {
        state.clearSelected();
        return;
      }
      if (isStrictlyInfinity(index) || index < 0 || currentList.length <= index) {
        state.clearSelected();
        return;
      }
      if (!currentList[index]) {
        state.clearSelected();
        return;
      }
      return state.storage[index] as DMEData.Block<T>;
    },
    removeByPath: (path: Array<number>) => {
      set((state) => {
        if (path.length === 0) return;
        const parentPath = path.length <= 1 ? [] : path.slice(0, path.length - 1);
        const index = path[path.length - 1];
        const list = getListByPath(state.storage, parentPath);
        if (!list) {
          console.warn('Parent data not found in path', parentPath);
          return;
        }

        list.splice(index, 1);
      });
    },
    removeBlock: (block) =>
      set((state) => {
        state.storage = state.storage.filter((w) => w !== block);
      }),
    setSelected: (blockIndex?: number) => {
      set((state) => {
        if (blockIndex === undefined) {
          state.clearSelected();
          return;
        }

        state.selected.blockIndex = blockIndex;
        // state.designer.selectedBlockIndex = selected;
        //state.designer.selectedBlock = block;
      });
    },
    setStorage: (blocks: DMEData.Block[]) => {
      set((state) => {
        const propertiesMap: {
          [index: string]: DMEData.Block;
        } = properties.reduce((acc, cur) => {
          if (!cur || !cur.type) {
            return acc;
          }
          acc[cur.type] = cur;
          return acc;
        }, {});

        state.storage = blocks.map((block) => {
          if (!block || !block.type) {
            return block;
          }
          if (!propertiesMap[block.type]) {
            return block;
          } else {
            const initBlockData = propertiesMap[block.type].events.createBlock();

            return {
              ...block,
              data: {
                ...initBlockData,
                ...block.data,
                settings: {
                  ...initBlockData.settings,
                  ...block.data.settings,
                },
              },
            };
          }
        });
        // state.selected.currentList = state.storage;
      });
    },
    updateSelectedBlockIndex: (pathArray: Array<number>, id: string) => {
      set((state) => {
        const parentPath = pathArray.length <= 1 ? [] : pathArray.slice(0, pathArray.length - 1);
        const index = pathArray[pathArray.length - 1];
        state.selected.blockIndex = index;
        if (state.selected.currentListPath.join() !== parentPath.join()) {
          // switch list context
          state.selected.currentListPath = parentPath;
        }
        state.selected.blockId = id;
      });
    },
    updateBlockByPath: <Type = DMEData.DefaultDataType>(
      path: Array<number>,
      callback: (blockData: Type, block: unknown) => void,
    ) => {
      set((state) => {
        const block = getDataByPath(state.storage, path);
        if (!block) {
          console.error('Block not found');
          return;
        }
        callback(block.data as Type, block);
      });
    },
    updateBlockPropsByPath(path, propName, propValue) {
      const state = get();
      state.updateBlockByPath(path, (_, block) => {
        if (!propName) {
          console.error('Invalid propName', propName);
          return;
        }

        if (!block) {
          return;
        }
        if (!block.data) {
          block.data = {};
        }

        const [propKey, realPropsName, realPropsName2] = propName.split('.');
        if (isEmptyString(propKey)) {
          if (isPlainObject(block.data)) {
            block['data'][realPropsName] = propValue;
          } else {
            console.warn('data is not an object');
          }
        } else if (propKey === 'settings') {
          if (isPlainObject(block.data)) {
            if (isKeyInObject('settings', block.data)) {
              if (realPropsName === 'general') {
                console.log(realPropsName, realPropsName2);
                if (isKeyInObject('general', block.data.settings)) {
                  block.data.settings.general[realPropsName2] = propValue;
                } else {
                  console.log(realPropsName, realPropsName2, 22);
                  block.data[propKey][realPropsName] = { [realPropsName2]: propValue };
                }
              } else {
                block.data[propKey][realPropsName] = propValue;
              }
            } else {
              if (realPropsName === 'general') {
                block.data[propKey] = { general: { [realPropsName2]: propValue } };
              } else {
                const settings = { [realPropsName]: propValue };
                block.data[propKey] = settings;
              }
            }
          } else {
            console.warn('settings is not an object');
          }
        } else {
          console.error(
            `Invalid propName: ${propName}, it should be "settings.${propName}" or ".${propName}"`,
          );
        }
      });
    },
    updateSelectedBlock: <Type = DMEData.DefaultDataType>(
      callback: (blockData: Type, block: unknown) => void,
    ) => {
      const state = get();
      const path = [...state.selected.currentListPath, state.selected.blockIndex];
      state.updateBlockByPath(path, callback);
    },
    updateSelectedBlockEditControl: (value: number) => {
      const state = get();
      state.updateSelectedBlockProps('.editControl', value);
    },
    updateSelectedBlockStyle: (value: string, styleIdentifier: string) => {
      const state = get();
      const path = [...state.selected.currentListPath, state.selected.blockIndex];

      state.updateBlockByPath(path, (_, block) => {
        if (!block.style) {
          block.style = {};
        }
        if (styleIdentifier === '_') {
          if (!value) {
            block.style = {};
          } else {
            block.style = { _: value };
          }
        } else {
          block.style[styleIdentifier] = value;
        }
      });
    },
    updateSelectedBlockProps: (propName, propValue) => {
      const state = get();
      const path = [...state.selected.currentListPath, state.selected.blockIndex];

      state.updateBlockPropsByPath(path, propName, propValue);
    },
    toggleProperty: (status) => set(() => ({ status })),
    updatePage: (value: string, key: string) => {
      set((state) => {
        state.page[key] = value;
      });
    },
    setPageData: (data: DMEData.Page) => {
      set((state) => {
        state.page = data;
      });
    },
    moveTo: (block: DMEData.Block, targetPath: Array<number>) => {
      set((state) => {
        // get latest parent
        const parentBlock = getListByPath(
          state.storage,
          targetPath.slice(0, targetPath.length - 1),
        );
        if (!parentBlock) {
          console.error('Parent block not found');
          return;
        }

        const targetIndex = targetPath[targetPath.length - 1];

        if (targetIndex < 0 || targetIndex > parentBlock.length) {
          console.warn('Invalid target index', targetIndex);
          return;
        }

        // insert block to target path
        parentBlock.splice(targetPath[targetPath.length - 1], 0, block);
      });
    },
    setCopyBlock: (block: DMEData.Block) => {
      set((state) => {
        state.copyBlock = block;
      });
    },
    getCopyBlock: () => {
      const state = get();
      return { ...state.copyBlock, id: `widget-${nanoid()}` } as any;
    },
  })),
);
