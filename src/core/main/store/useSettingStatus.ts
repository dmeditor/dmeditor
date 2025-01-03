import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useSettingStatus = create<
  { isActive: boolean } & { setIsActive: (isActive: boolean) => void }
>()(
  immer((set) => ({
    isActive: false,
    setIsActive: (isActive: boolean) => {
      set((state) => {
        state.isActive = isActive;
      });
    },
  })),
);
