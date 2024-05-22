import { DMEData } from '../../core/types';

interface CodeEntity {
  content: string;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

const initCodeEntity = (): CodeEntity => ({
  content: '',
  settings: {
    general: { padding: 20 },
  },
});

export { initCodeEntity };
export type { CodeEntity };
