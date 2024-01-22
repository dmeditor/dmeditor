import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { AlignType } from '../property-setting/Align';

type State = {
  align: AlignType;
};
type Actions = {
  alignStateChange: (align: AlignType) => void;
};

const useAlignStore = create<State & Actions>()(
  immer((set) => ({
    align: 'left',
    alignStateChange: (align: AlignType) =>
      set((state) => {
        state.align = align;
      }),
  })),
);

export default useAlignStore;
