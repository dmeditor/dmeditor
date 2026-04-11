import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { SelectionActions, SelectionState } from './types';

export const useSelectionStore = create<SelectionState & SelectionActions>()(
  immer((set, get) => ({
    selected: {
      blockId: '',
      blockIndex: -Infinity,
      currentListPath: [] as Array<number | string>,
    },
    hoverPath: undefined,
    setSelected: (blockIndex?: number, context?: (string | number)[]) => {
      set((state) => {
        if (blockIndex === undefined) {
          state.selected.blockIndex = -Infinity;
          return;
        }
        state.selected.blockIndex = blockIndex;
        if (context) {
          state.selected.currentListPath = context;
        }
      });
    },
    clearSelected: () => {
      set((state) => {
        state.selected.blockIndex = -Infinity;
      });
    },
    isSelected: (): boolean => {
      return get().selected.blockIndex !== -Infinity;
    },
    updateSelectedBlockIndex: (pathArray: Array<number | string>, id: string) => {
      set((state) => {
        const parentPath = pathArray.length <= 1 ? [] : pathArray.slice(0, pathArray.length - 1);
        const index = pathArray[pathArray.length - 1];
        state.selected.blockIndex = index;
        if (state.selected.currentListPath.join() !== parentPath.join()) {
          state.selected.currentListPath = parentPath;
        }
        state.selected.blockId = id;
      });
    },
    updateHoverPath: (path: Array<number | string>) => {
      set((state) => {
        state.hoverPath = path;
      });
    },
  })),
);
