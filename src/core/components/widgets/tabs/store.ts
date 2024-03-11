import React from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface TabsStore {
  activeKey: string | number;
  setActiveKey: (key: string | number, event?: React.SyntheticEvent) => void;
}
export const useTabsStore = create<TabsStore>()(
  immer((set) => ({
    activeKey: '1',
    setActiveKey: (key) => {
      set((state) => {
        if (key === null) {
          console.error('key is null');
          return;
        }
        state.activeKey = key;
      });
    },
  })),
);
