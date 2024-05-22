import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig } from '../../core/config';
import { Category } from '../../core/enum';
import { generalSettings } from '../../core/setting-panel/property-setting';
import { CodeEntity, initCodeEntity } from './entity';

const definition: DME.Widget = {
  category: Category.Widget,
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
      name: 'Content',
      property: '.content',
      settingComponent: 'input',
      parameters: { multiline: true, rows: 6 },
    },
    ...generalSettings,
  ],
};

export default definition;
