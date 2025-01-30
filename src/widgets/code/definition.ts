import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import { Category } from '../../core/constants';
import { CodeEntity, initCodeEntity } from './entity';

const definition: DME.Widget = {
  category: 'basic',
  icon: 'code',
  name: i18n('Code', 'widget'),
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
    ...getCommonSettings(),
  ],
};

export default definition;
