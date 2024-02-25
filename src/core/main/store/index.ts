import type { ReactNode } from 'react';
import { isPlainObject } from 'lodash';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createDMEditor } from '..';
import { GetDataByPath, GetListByPath, iteratePath } from './helper';
import type { DMEData } from 'Core/types/dmeditor';
import emitter from 'Core/utils/event';
import { getWidgetWithVariant, properties } from 'Src/core/components/widgets';
import { isEmptyString, isKeyInObject, isStrictlyInfinity } from 'Src/core/utils';

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
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => void;
  getSelectedBlock: <T = DMEData.Block<DMEData.DefaultDataType>>() => DMEData.Block<T> | undefined;
  getBlock: <T = DMEData.Block<DMEData.DefaultDataType>>(
    index: number,
  ) => DMEData.Block<T> | undefined;
  removeBlock: (widget: ReactNode) => void;
  removeByPath: (path: Array<number>) => void;
  setSelected: (widget: ReactNode) => void;
  setStorage: (data: DMEData.Block[]) => void;
  updateSelectedBlockIndex: (pathArray: Array<number>, id: string) => void;
  getCurrentList: () => DMEData.BlockList | null;
  getCurrentBlock: () => DMEData.Block | null;
  getBlockByPath: (path: Array<number>) => DMEData.Block;
  getParents: () => Array<DMEData.Block & { path: Array<number> }>; //get parent Block from top to down, based on currentListPath
  updateSelectedBlock: <Type = DMEData.DefaultDataType>(
    callback: (blockData: Type) => void,
  ) => void;
  updateSelectedBlockProps: (propName: string, propValue: string | number) => void;
  updateSelectedBlockStyle: (value: string, styleIdentifier: string) => void;
  toggleProperty: (status: boolean) => void;
  isSelected: () => boolean;
  updatePage: (value: string, key: string) => void;
  setPageData: (data: DMEData.Page) => void;
};

// const useEditorStore = create<Store & Actions>((set) => {
//   // toggleProperty: (status) => set(() => ({ status })),
//   const initialState = createDMEditor();
//   return {
//     ...initialState,
//     // toggleProperty: (status) => set(() => ({ status })),
//   };
// });

const useEditorStore = create<Store & Actions>()(
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
    addBlock: (type: string, style?: string) =>
      set((state) => {
        if (!state.addBlockData) {
          return;
        }
        const { index, position, context } = state.addBlockData;
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

        const listData = GetListByPath(state.storage, context || []);
        let newPosition: number = -Infinity;
        if (!listData) {
          return;
        }
        if (listData.length === 0) {
          listData.push(blockData);
          newPosition = 0;
        } else {
          if (index <= listData.length - 1 && state.addBlockData.position) {
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

        state.addBlockData.status = 'done';
      }),
    cancelAdding: () =>
      set((state) => {
        if (state.addBlockData) {
          const context = state.addBlockData.context;
          const parentList = GetListByPath(state.storage, context);
          if (context.length > 0 && parentList && parentList.length === 0) {
            //todo: remove
            //  state.removeByPath(context);

            const parentContext = context.slice(0, context.length - 1);
            const list = GetListByPath(state.storage, parentContext);
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
      return GetListByPath(state.storage, currentPath);
    },
    getCurrentBlock: (): DMEData.Block | null => {
      const state = get();
      const list = state.getCurrentList();
      return list?.[state.selected.blockIndex] || null;
    },
    getBlockByPath: (path: Array<number>): DMEData.Block => {
      const state = get();
      return GetDataByPath(state.storage, path);
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
    loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => {
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
        const list = GetListByPath(state.storage, parentPath);
        if (!list) {
          console.warn('Parent data not found in path', parentPath);
          return;
        }

        list.splice(index, 1);
      });
    },
    removeBlock: (block: ReactNode) =>
      set((state) => {
        state.storage = state.storage.filter((w) => w !== widget);
      }),
    setSelected: (block: ReactNode) => {
      set((state) => {
        if (!block) {
          state.clearSelected();
          return;
        }
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
    updateSelectedBlock: <Type = DMEData.DefaultDataType>(callback: (blockData: Type) => void) => {
      set((state) => {
        const path = [...state.selected.currentListPath, state.selected.blockIndex];
        const block = GetDataByPath(state.storage, path);
        callback(block?.data as Type);
        // state.storage[state.selected.blockIndex]['data'] = data;
      });
    },
    updateSelectedBlockStyle: (value: string, styleIdentifier: string) => {
      set((state) => {
        const block = GetDataByPath(state.storage, [
          ...state.selected.currentListPath,
          state.selected.blockIndex,
        ]);
        if (!block) {
          return;
        }
        if (!block.style) {
          block.style = {};
        }
        console.log(value, styleIdentifier);
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
    updateSelectedBlockProps: (propName: string, propValue: string | number) => {
      set((state) => {
        if (!propName) {
          console.error('Invalid propName', propName);
          return;
        }

        const block = GetDataByPath(state.storage, [
          ...state.selected.currentListPath,
          state.selected.blockIndex,
        ]);
        if (!block) {
          console.error('Block not found');
          return;
        }

        //todo: check this from entity
        // if (!block['data']['settings'][propName]) {
        //   console.error(`Property ${propName} not found`);
        //   return;
        // }

        // todo: put settings to separate method
        const [propKey, realPropsName] = propName.split('.');
        // the property is in the root of the block
        if (isEmptyString(propKey)) {
          if (isPlainObject(state.storage[state.selected.blockIndex].data)) {
            block['data'][realPropsName] = propValue;
          } else {
            console.warn('data is not an object');
          }
        } else if (propKey === 'settings') {
          if (isPlainObject(block.data)) {
            if (isKeyInObject('settings', block.data)) {
              block.data[propKey][realPropsName] = propValue;
            } else {
              const settings = { [realPropsName]: propValue };
              block.data[propKey] = settings;
            }
          } else {
            console.warn('settings is not an object');
          }
        } else {
          console.error(
            `Invalid propName: ${propName}, it should be "settings.${propName}" or ".${propName}"`,
          );
          // state.storage[state.selected.blockIndex].data = {
          //   ...state.storage[state.selected.blockIndex].data,
          //   settings: {
          //     ...(state.storage[state.selected.blockIndex].data.settings as any),
          //     [realPropsName]: propValue,
          //   },
          // };
        }
      });
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
  })),
);

export { useEditorStore };
