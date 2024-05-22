import { DMEData } from '../../core/types';

interface CodeEntity {
  content: string;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

const initCodeEntity = (): CodeEntity => ({
  content: '',
  settings: {},
});

export { initCodeEntity };
export type { CodeEntity };
