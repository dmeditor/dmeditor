import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useBooleanStore = create<
  { booleanValue: boolean } & { toggleBooleanValue: (value?: boolean) => void }
>()(
  immer((set) => ({
    booleanValue: false,
    toggleBooleanValue: (value?: boolean) => {
      set((state) => {
        state.booleanValue = value ?? !state.booleanValue;
      });
    },
  })),
);
