import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings } from '../..';
import { Category } from '../../core/constants';
import { CodeEntity, initCodeEntity } from './entity';

const definition: DME.Widget = {
  category: 'basic',
  icon: 'code',
  name: 'Code',
  type: 'code',
  events: {
    createBlock: (): DMEData.CreatedBlock<CodeEntity> => {
      return {
        type: 'code',
        data: initCodeEntity(),
      };
    },
  },
  settings: [
    {
      name: 'Code',
      property: '',
      custom: true,
      settingComponent: 'codeInput',
    },
    ...generalSettings,
  ],
};

export default definition;
