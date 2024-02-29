import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useTableStore = create<
  { activeCellIndex: [number, number]; width: number; width2: number } & {
    setActiveCellIndex: (index: [number, number]) => void;
    setWidth: (v: number) => void;
    setWidth2: (v: number) => void;
  }
>()(
  immer((set) => ({
    activeCellIndex: [0, 0],
    width: 20,
    width2: 20,
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
    setWidth2: (v: number) => {
      set((state) => {
        state.width2 = v;
      });
    },
  })),
);
