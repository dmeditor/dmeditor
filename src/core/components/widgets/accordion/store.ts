import React from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AccordionStore {
  activeKey: string | number;
  setActiveKey: (key: string | number, event?: React.SyntheticEvent) => void;
}
export const useAccordionStore = create<AccordionStore>()(
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
