import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { AddBlockParameters, BlockOperationsActions, BlockOperationsState } from './types';

export const useBlockOperationsStore = create<BlockOperationsState & BlockOperationsActions>()(
  immer((set) => ({
    addBlockData: undefined,
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
    cancelAdding: () =>
      set((state) => {
        if (state.addBlockData) {
          state.addBlockData.status = 'done';
        }
      }),
    clearAdding: () => {
      set((state) => {
        state.addBlockData = undefined;
      });
    },
  })),
);
