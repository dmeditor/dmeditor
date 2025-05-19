import { isPlainObject } from 'lodash';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createDMEditor } from '..';
import { dmeConfig } from '../../../core/config';
import type { DME, DMEData } from '../../types/dmeditor';
import { isEmptyString, isKeyInObject, isStrictlyInfinity, setBlockValueByPath } from '../../utils';
import emitter from '../../utils/event';
import { getWidgetStyleOption, getWidgetWithVariant, properties } from '../../utils/register';
import { getDataByPath, getListByPath, iterateBlockTree, iteratePath } from './helper';
import type { Actions, AddBlockParameters, Store } from './types';
import { useGlobalVars } from './useGlobalVars';
import { useSettingStatus } from './useSettingStatus';

export const useEditorStore = create<Store & Actions>()(
  immer((set, get) => ({
    ...createDMEditor(),
    startAddBlock: (
      context: Array<number | string>,
      index: number,
      position: AddBlockParameters['position'],
      extraParams: { types?: Array<string> | string; isEmbed?: boolean },
    ) =>
      set((state) => {
        state.addBlockData = {
          context,
          index,
          position,
          status: 'started',
          types: extraParams.types,
          isEmbed: extraParams.isEmbed,
        };
      }),
    addBlock: (type: string, addData?: { style?: string; savedBlock?: any }) => {
      const state = get();
      if (!state.addBlockData) {
        return;
      }
      const { index, position, context, isEmbed } = state.addBlockData;

      state.executeAdding(context, index, position, type, isEmbed ? true : false, addData);
      set((state) => {
        if (state.addBlockData) {
          state.addBlockData.status = 'done';
        }
      });
    },
    setMode: (mode: DME.Mode) => {
      set((state) => {
        state.mode = mode;
      });
    },
    executeAdding: (
      context: Array<number | string>,
      index: number,
      position: AddBlockParameters['position'],
      type: string,
      isEmbed: boolean,
      addData?: { style?: string; savedBlock?: any },
    ) =>
      set((state) => {
        if (index == -Infinity) {
          return;
        }

        const [widget, variant] = getWidgetWithVariant(type);
        if (!widget) {
          return;
        }
        let blockData: DMEData.Block;
        if (addData && addData.savedBlock) {
          blockData = addData.savedBlock;
        } else {
          if (variant) {
            blockData = variant.getDefaultData?.() as any;
          } else {
            const createdBlock = widget.events.createBlock();
            const defaultStyle = dmeConfig.editor.defaultStyle[type];
            if (!createdBlock.style && defaultStyle) {
              createdBlock.style = defaultStyle;
            }

            if (!createdBlock.id) {
              createdBlock.id = nanoid();
            }

            blockData = createdBlock as DMEData.Block;
          }
          if (addData && addData.style) {
            blockData.style = { _: addData.style };
          }
        }

        if (!blockData) {
          return;
        }

        //update data(settings) from style
        const blockStyle = blockData.style;
        if (blockStyle) {
          for (const style of Object.keys(blockStyle)) {
            const option = blockStyle[style];
            const optionDef = getWidgetStyleOption(blockData.type, option, style);
            if (!optionDef) {
              continue;
            }

            const styleSettings = optionDef.settings;
            if (styleSettings) {
              for (const property of Object.keys(styleSettings)) {
                const value = styleSettings[property].value;
                setBlockValueByPath(blockData, property, value);
              }
            }
          }
        }

        if (isEmbed) {
          blockData.isEmbed = true;
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
            if (typeof parentIndex === 'number') {
              list.splice(parentIndex, 1);
            }
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
    updateHoverPath: (path: Array<number | string>) => {
      set((state) => {
        state.hoverPath = path;
      });
    },
    getCurrentList: (): DMEData.BlockList | DMEData.BlockMap | null => {
      const state = get();
      const currentPath = state.selected.currentListPath;
      return getListByPath(state.storage, currentPath);
    },
    getCurrentBlock: (): DMEData.Block | null => {
      const state = get();
      const list = state.getCurrentList();
      return list?.[state.selected.blockIndex] || null;
    },
    getBlockByPath: (path: Array<number | string>): DMEData.Block | null => {
      const state = get();
      return getDataByPath(state.storage, path);
    },
    getClosestBlock: (
      path: Array<number | string>,
    ): [DMEData.Block, Array<number | string>] | [] => {
      const state = get();

      if (path.length === 0) {
        return [];
      }

      const parents: Array<any> = [];
      iteratePath(path, state.storage, (item, path) => {
        parents.push([item, path]);
      });
      parents.reverse();

      for (const item of parents) {
        if (!item[0].isEmbed) {
          return item;
        }
      }
      return [];
    },
    getParents: (
      path: Array<number | string>,
    ): Array<DMEData.Block & { path: Array<number | string> }> => {
      const state = get();
      const result: Array<DMEData.Block & { path: Array<number | string> }> = [];
      if (path.length === 0) {
        return [];
      }
      iteratePath(path.slice(0, path.length - 1), state.storage, (item, path) => {
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
    removeByPath: (path: Array<number | string>) => {
      set((state) => {
        if (path.length === 0) return;
        const parentPath = path.length <= 1 ? [] : path.slice(0, path.length - 1);
        const index = path[path.length - 1];
        const list = getListByPath(state.storage, parentPath);
        if (!list) {
          console.warn('Parent data not found in path', parentPath);
          return;
        }

        if (typeof index === 'number') {
          list.splice(index, 1);
        } else {
          console.warn('Canot remove from object children');
        }
      });
    },
    removeBlock: (block) =>
      set((state) => {
        state.storage = state.storage.filter((w) => w !== block);
      }),
    setSelected: (blockIndex?: number, context?: (string | number)[]) => {
      set((state) => {
        if (blockIndex === undefined) {
          state.clearSelected();
          return;
        }

        state.selected.blockIndex = blockIndex;
        if (context) {
          state.selected.currentListPath = context;
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

        state.storage = blocks;
      });
    },
    updateSelectedBlockIndex: (pathArray: Array<number | string>, id: string) => {
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
      path: Array<number | string>,
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

        setBlockValueByPath(block, propName, propValue);
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
    updateBlockStyleByPath: (
      value: string,
      styleIdentifier: string,
      path: Array<number | string>,
    ) => {
      const state = get();

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
    insertBlock: (block: DMEData.Block, targetPath: Array<number | string>) => {
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
        if (typeof targetIndex !== 'number') {
          return;
        }

        if (targetIndex < 0 || targetIndex > parentBlock.length) {
          console.warn('Invalid target index', targetIndex);
          return;
        }

        // insert block to target path
        parentBlock.splice(targetIndex as number, 0, block);
      });
    },
    setCopyBlock: (block: DMEData.Block) => {
      set((state) => {
        localStorage.setItem(dmeConfig.editor.clipboardKey, JSON.stringify(block));
      });
    },
    clearCopyBlock: () => {
      set((state) => {
        localStorage.removeItem(dmeConfig.editor.clipboardKey);
      });
    },
    getCopyBlock: () => {
      const clipboardStr = localStorage.getItem(dmeConfig.editor.clipboardKey);
      if (!clipboardStr) {
        return false;
      }
      try {
        const clipboard = JSON.parse(clipboardStr);
        iterateBlockTree(clipboard, (item) => {
          item.id = nanoid();
        });
        return clipboard as any;
      } catch (ex) {
        console.error('Not an object in clipboard. ref: ' + clipboardStr);
        return false;
      }
    },
    reset: () => {
      set(() => createDMEditor());
    },
    getRecentColors: () => {
      const state = get();
      return state.recentColors;
    },
    updateRecentColors: (color: string) => {
      set((state) => {
        if (state.recentColors.includes(color)) {
          return;
        }
        state.recentColors.unshift(color);
        if (state.recentColors.length > 10) {
          state.recentColors = state.recentColors.slice(0, 10);
        }
        if (window && window.localStorage) {
          window.localStorage.setItem('recentColors', JSON.stringify(state.recentColors));
        }
      });
    },
  })),
);

export const useWidgetSettingStore = create<
  { mainLoaded: boolean } & { setMainLoaded: (loaded: boolean) => void }
>()(
  immer((set) => ({
    mainLoaded: false,
    setMainLoaded: (loaded: boolean) => {
      set((state) => {
        state.mainLoaded = loaded;
      });
    },
  })),
);

export { useGlobalVars, useSettingStatus };
export type { AddBlockParameters };
