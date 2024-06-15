import { nanoid } from 'nanoid';

import { dmeConfig, generalSettings } from '../..';
import type { DME, DMEData } from '../..';
import { i18n } from '../../core/i18n';
import { initialTextEntity } from './entity';
import type { EntityText } from './entity';

const TextWidget: DME.Widget = {
  category: 'basic',
  icon: 'text',
  name: i18n('Text', 'widget'),
  type: 'text',
  events: {
    createBlock: (): DMEData.Block<EntityText> => {
      return {
        id: nanoid(),
        type: 'text',
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
    {
      name: 'Text color',
      property: 'settings.color',
      settingComponent: 'color',
      category: 'block',
    },
    ...generalSettings,
  ],
};

export default TextWidget;
