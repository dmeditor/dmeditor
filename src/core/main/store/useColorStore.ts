import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { ColorActions, ColorState } from './types';

function loadRecentColors(): string[] {
  if (typeof window !== 'undefined' && window.localStorage) {
    const colors = window.localStorage.getItem('recentColors');
    if (colors) return JSON.parse(colors);
  }
  return [];
}

export const useColorStore = create<ColorState & ColorActions>()(
  immer((set, get) => ({
    recentColors: loadRecentColors(),
    getRecentColors: () => get().recentColors,
    updateRecentColors: (color: string) => {
      set((state) => {
        if (state.recentColors.includes(color)) return;
        state.recentColors.unshift(color);
        if (state.recentColors.length > 10) {
          state.recentColors = state.recentColors.slice(0, 10);
        }
        if (window && window.localStorage) {
          window.localStorage.setItem('recentColors', JSON.stringify(state.recentColors));
        }
      });
    },
  })),
);
