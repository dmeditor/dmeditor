import type { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createDMEditor } from '..';
import emitter from 'Core/utils/event';
import type { DMEData } from 'Src/core/components/types/blocktype';
import { properties } from 'Src/core/components/widgets';
import { isStrictlyInfinity } from 'Src/core/utils';

export type AddBlockPosition = 'before' | 'after';
export type AddBlockStatus = 'started' | 'done';

type Store = {
  selected: {
    blockId: string; //unique id
    blockIndex: number; //-Infinity if it's not selected
    //current blocklist path as context. Use getCurrentList to get current list data
    //eg. [0,1] means first on root level, second on second level
    currentListPath: Array<number>;
  };
  addBlockData: {
    index: number;
    position?: AddBlockPosition;
    status?: AddBlockStatus;
  };
  storage: DMEData.BlockList; //data layer
};

type Actions = {
  startAddBlock: (index: number, type: AddBlockPosition) => void;
  cancelAdding: () => void;
  addBlock: (data: DMEData.Block) => void;
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => void;
  getSelectedBlock: (index: number) => DMEData.Block | undefined;
  removeBlock: (widget: ReactNode) => void;
  setSelected: (widget: ReactNode) => void;
  setStorage: (data: DMEData.Block[]) => void;
  updateSelectedBlockIndex: (pathArray:Array<number>, index: number) => void;
  getCurrentList: () => DMEData.BlockList;
  updateSelectedBlockProps: (propName: string, propValue: string | number) => void;
  toggleProperty: (status: boolean) => void;
  isSelected: () => boolean;
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
    startAddBlock: (index: number, position: AddBlockPosition) =>
      set((state) => {
        state.addBlockData.index = index;
        state.addBlockData.position = position;
        state.addBlockData.status = 'started';
      }),
    addBlock: (data: DMEData.Block) =>
      set((state) => {
        const index = state.addBlockData.index;
        const position = state.addBlockData.position;
        const status = state.addBlockData.status;
        if (index == -Infinity) {
          return;
        }
        if (index <= state.storage.length - 1 && state.addBlockData.position) {
          let newPosition:number = -Infinity;
          if (position == 'before') {
            state.storage.splice(index, 0, data);
            newPosition = index - 1;
          } else if (position == 'after') {
            state.storage.splice(index + 1, 0, data);
            newPosition = index + 1;
          }

          //update to new block
          state.selected.blockIndex = newPosition;

          state.addBlockData.index = -Infinity;
          state.addBlockData.position = undefined;
          state.addBlockData.status = undefined;
        }
      }),
    cancelAdding: () =>
      set((state) => {
        state.addBlockData.index = -Infinity;
        state.addBlockData.position = undefined;
        state.addBlockData.status = undefined;
      }),
    clearWidgets: () => {
      set((state) => {
        // state.designer.selectedBlockIndex = -1;
        state.selected.blockIndex = -Infinity;
        state.storage = [];
      });
    },
    getCurrentList: ():DMEData.BlockList => {
      const state = get();
      const currentPath = state.selected.currentListPath;
      let list = state.storage;;
      if(currentPath.length>0){
        for(const i of currentPath){          
            list = list[i].children||[];
        }
      }
      return list;
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
    getSelectedBlock: (index: number) => {
      const state = get();
      const currentList = state.getCurrentList();
      if (
        isStrictlyInfinity(index) ||
        index < 0 ||
        currentList.length <= index
      ) {
        state.clearSelected();
        return;
      }
      if (!currentList[index]) {
        state.clearSelected();
        return;
      }
      return state.storage[index];
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
        const propertiesMap = properties.reduce((acc, cur) => {
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
            return {
              ...block,
              settings: {
                ...propertiesMap[block.type],
                ...block.settings,
              },
            };
          }
        });
        // state.selected.currentList = state.storage;
      });
    },
    updateSelectedBlockIndex: (pathArray:Array<number>, index: number) => {
      set((state) => {
        state.selected.blockIndex = index;
        if( state.selected.currentListPath.join() !== pathArray.join() ){
          // switch list context
           state.selected.currentListPath = pathArray;
        }
        console.log(index);
      });
    },
    updateSelectedBlockProps: (propName: string, propValue: string | number) => {
      set((state) => {
        if (!propName) {
          console.error('Invalid propName', propName);
          return;
        }

        const block = state.getSelectedBlock(state.selected.blockIndex);
        if (!block) {
          console.error('Block not found');
          return;
        }

        //todo: check this from entity
        // if (!block['data']['settings'][propName]) {
        //   console.error(`Property ${propName} not found`);
        //   return;
        // }

        //todo: put settings to separate method

        const propArr = propName.split('.');
        const realPropsName = propArr.length === 1 ? propArr[0] : propArr[1];

        if (propArr.length == 1) {
          state.storage[state.selected.blockIndex].data = {
            ...block.data,
            [realPropsName]: propValue,
          };
        } else {
          state.storage[state.selected.blockIndex].data['settings'] = {
            ...block.settings,
            [realPropsName]: propValue,
          };
        }

        // state.storage[state.selected.blockIndex].data.settings = {
        //   ...block.settings,
        //   [propName]: propValue,
        // };
      });
    },
    toggleProperty: (status) => set(() => ({ status })),
  })),
);

export { useEditorStore };
