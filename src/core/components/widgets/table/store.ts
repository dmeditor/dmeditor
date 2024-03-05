import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useTableStore = create<
  { activeCellIndex: [number, number]; color: string; width: number } & {
    setActiveCellIndex: (index: [number, number]) => void;
    setWidth: (w: number) => void;
  }
>()(
  immer((set) => ({
    activeCellIndex: [0, 0],
    width: 200,
    color: '#cccccc',
    setActiveCellIndex: (index: [number, number]) => {
      set((state) => {
        state.activeCellIndex = index;
      });
    },
    setColor: (c: string) => {
      set((state) => {
        state.color = c;
      });
    },
    setWidth: (w: number) => {
      set((state) => {
        state.width = w;
      });
    },
  })),
);
