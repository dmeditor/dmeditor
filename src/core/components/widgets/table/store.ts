import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useTableStore = create<
  { activeCellIndex: [number, number]; width: number } & {
    setActiveCellIndex: (index: [number, number]) => void;
    setWidth: (v: number) => void;
  }
>()(
  immer((set) => ({
    activeCellIndex: [0, 0],
    width: 100,
    setActiveCellIndex: (index: [number, number]) => {
      set((state) => {
        state.activeCellIndex = index;
      });
    },
    setWidth: (v: number) => {
      set((state) => {
        state.width = v;
      });
    },
  })),
);
