import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/** Global parameters to simulate location */
export const useLocationParams = create<
  { parameters: Record<string, string | number> } & {
    setParameter: (key: string, v: string | number) => void;
    removeParameter: (key: string) => void;
    resetParameter: () => void;
  }
>()(
  immer((set) => ({
    parameters: {},
    setParameter: (key: string, v: string | number) => {
      set((state) => {
        state.parameters[key] = v;
      });
    },
    removeParameter: (key: string) => {
      set((state) => {
        delete state.parameters[key];
      });
    },
    resetParameter: () => {
      set((state) => {
        state.parameters = {};
      });
    },
  })),
);
