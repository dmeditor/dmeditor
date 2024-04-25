import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useBooleanStore = create<{ value: boolean } & { toggle: (value?: boolean) => void }>()(
  immer((set) => ({
    value: true,
    toggle: (value?: boolean) =>
      set((state) => {
        state.value = value ?? !state.value;
      }),
  })),
);
