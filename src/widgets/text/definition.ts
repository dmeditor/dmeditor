import { nanoid } from 'nanoid';

import { dmeConfig } from '../../core';
import type { DME, DMEData } from '../../core';
import { i18n } from '../../core/i18n';
import { initialTextEntity } from './entity';
import type { EntityText } from './entity';

const TextWidget: DME.Widget = {
  category: 'widget',
  icon: 'text',
  name: i18n('Text', 'widget'),
  type: 'text',
  events: {
    createBlock: (): DMEData.Block<EntityText> => {
      const defaultStyle = dmeConfig.widgets['text']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      return {
        id: nanoid(),
        type: 'text',
        ...styleObj,
        data: {
          ...initialTextEntity(),
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: '',
      property: '.value',
      settingComponent: 'rich-text',
    },
  ],
};

export default TextWidget;