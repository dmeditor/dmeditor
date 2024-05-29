import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings } from '../..';
import { Category } from '../../core/enum';
import { CodeEntity, initCodeEntity } from './entity';

const definition: DME.Widget = {
  category: 'basic',
  icon: 'code',
  name: 'Code',
  type: 'code',
  events: {
    createBlock: (): DMEData.Block<CodeEntity> => {
      const defaultStyle = dmeConfig.widgets['code']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      return {
        id: `${nanoid()}-code`,
        type: 'code',
        style: { _: 'default' },
        ...styleObj,
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
