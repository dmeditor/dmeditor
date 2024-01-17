import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  id: string;
  level: number;
  value: string;
};

type Actions = {
  headingStateChange: (type: keyof State, value: string) => void;
};

const useHeadingStore = create<State & Actions>()(
  immer((set) => ({
    id: '',
    level: 2,
    value: 'Heading',
    headingStateChange: (type, value: string) =>
      set((state) => {
        if (type === 'id') {
          state.id = value;
        } else if (type === 'level') {
          state.level = Number(value);
        } else if (type === 'value') {
          state.value = value;
        } else {
          throw new Error('Invalid type');
        }
      }),
  })),
);

export default useHeadingStore;
