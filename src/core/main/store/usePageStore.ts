import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { DMEData } from '../../types/dmeditor';
import type { PageActions, PageState } from './types';

export const usePageStore = create<PageState & PageActions>()(
  immer((set) => ({
    page: { title: 'New page' } as DMEData.Page,
    updatePage: (value: string, key: string) => {
      set((state) => {
        state.page[key] = value;
      });
    },
    setPageData: (data: DMEData.Page) => {
      set((state) => {
        state.page = data;
      });
    },
  })),
);
