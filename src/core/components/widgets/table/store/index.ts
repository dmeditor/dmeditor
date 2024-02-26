import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useTableStore = create<
  { activeCellIndex: [number, number] } & { setActiveCellIndex: (index: [number, number]) => void }
>()(
  immer((set) => ({
    activeCellIndex: [0, 0],
    setActiveCellIndex: (index: [number, number]) => {
      set((state) => {
        state.activeCellIndex = index;
      });
    },
  })),
);
