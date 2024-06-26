import { DMEData } from '../../core/types';

export interface EntityText {
  value: Array<{
    type: string;
    children: Array<{ text: string }>;
  }>;
  settings?: {
    color?: string;
    general?: DMEData.GeneralSettingType;
  };
}

const initialTextEntity = (): EntityText => {
  return {
    value: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
  };
};

export { initialTextEntity };
