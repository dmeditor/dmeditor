import { isServer, updateLocation } from 'dmeditor/core/utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/** Global parameters to simulate location */
export const useGlobalVars = create<
  { vars: Record<string, string | number> } & {
    setVar: (key: string, v: string | number) => void;
    removeVar: (key: string) => void;
    resetVar: () => void;
  }
>()(
  immer((set) => ({
    vars: {},
    setVar: (key: string, v: string | number) => {
      set((state) => {
        state.vars[key] = v;
        if (!isServer()) {
          updateLocation(state.vars);
        }
      });
    },
    removeVar: (key: string) => {
      set((state) => {
        delete state.vars[key];
      });
    },
    resetVar: () => {
      set((state) => {
        state.vars = {};
      });
    },
  })),
);
