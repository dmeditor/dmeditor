import { isServer, updateLocation } from 'dmeditor/core/utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/** Global parameters to simulate location */
export const useGlobalVars = create<
  { vars: Record<string, any> } & {
    initVars: (vars: Record<string, string>) => void;
    setVar: (key: string, v: any) => void; //key can be external variable or _<block id> (used in dependency)
    removeVar: (key: string) => void;
    resetVar: () => void;
  }
>()(
  immer((set) => ({
    vars: {},
    initVars: (vars: Record<string, string>) => {
      set((state) => {
        state.vars = { ...state.vars, ...vars };
      });
    },
    setVar: (key: string, v: any) => {
      set((state) => {
        state.vars[key] = v;
        if (!isServer()) {
          updateLocation(state.vars);
        }
      });
    },
    removeVar: (key: string) => {
      set((state) => {
        if (state.vars[key] !== undefined) {
          delete state.vars[key];
        }
      });
    },
    resetVar: () => {
      set((state) => {
        state.vars = {};
      });
    },
  })),
);
