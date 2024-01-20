import type { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createDMEditor } from '..';
import emitter from 'Core/utils/event';
import type { Data } from 'Src/core/components/types/blocktype';
import { properties } from 'Src/core/components/widgets';
import { isStrictlyInfinity } from 'Src/core/utils';

type Store = {
  selected: {
    selectedBlockIndex:number; //todo: revove selected
    selectedBlock:DMEData.Block|null;
  };
  currentList:DMEDMEData.BlockList; //current block list
  storage:DMEDMEData.BlockList; //data layer
};

type Actions = {
  addBlock: (block: ReactNode) => void;
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => void;
  getSelectedBlock: (index: number) => DMEData.Block | undefined;
  removeBlock: (widget: ReactNode) => void;
  setSelected: (widget: ReactNode) => void;
  setStorage: (data: DMEData.Block[]) => void;
  updateSelectedBlockIndex: (index: number) => void;
  updateSelectedBlockProps: (propName: string, propValue: string | number) => void;
  toggleProperty: (status: boolean) => void;
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
    addBlock: (widget: ReactNode) =>
      set((state) => {
        // state.designer.storage.push(widget);
      }),
    clearWidgets: () => {
      set((state) => {
        state.selected.selectedBlock = null;
        // state.designer.selectedBlockIndex = -1;
        state.selected.selectedBlockIndex = -Infinity;
        state.storage = [];
      });
    },
    clearSelected: () => {
      set((state) => {
        state.selected.selectedBlock = null;
        state.selected.selectedBlockIndex = -Infinity;
      });
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
      if (isStrictlyInfinity(index) || index < 0 || state.storage.length <= index) {
        state.clearSelected();
        return;
      }
      if (!state.storage[index]) {
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
              props: {
                ...propertiesMap[block.type],
                ...block.props,
              },
            };
          }
        });
        state.currentList = state.storage;
      });
    },
    updateSelectedBlockIndex: (index: number) => {
      set((state) => {
        state.selected.selectedBlockIndex = index;
      });
    },
    updateSelectedBlockProps: (propName: string, propValue: string | number) => {
      set((state) => {
        if (!propName) {
          console.error('Invalid propName', propName);
          return;
        }

        const block = state.getSelectedBlock(state.selected.selectedBlockIndex);
        if (!block) {
          console.error('Block not found');
          return;
        }

        if (!block['props'][propName]) {
          console.error(`Property ${propName} not found`);
          return;
        }

        state.storage[state.selected.selectedBlockIndex].props = {
          ...block.props,
          [propName]: propValue,
        };
      });
    },
    toggleProperty: (status) => set(() => ({ status })),
  })),
);

export { useEditorStore };
