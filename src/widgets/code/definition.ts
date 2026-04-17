import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import { Category } from '../../core/constants';
import { CodeEntity, initCodeEntity } from './entity';

const definition: DME.Widget = {
  category: 'basic',
  icon: 'code',
  get name() {
    return i18n('Code', 'widget');
  },
  type: 'code',
  editMask: true,
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
      get name() {
        return i18n('Code', 'property-label');
      },
      property: '',
      custom: true,
      settingComponent: 'codeInput',
    },
    {
      get name() {
        return i18n('Render as iframe', 'property-label');
      },
      property: '.renderAsIframe',
      description: i18n('If your code includes javascript, check this', 'widget'),
      settingComponent: 'checkbox',
    },
  ],
};

export default definition;
