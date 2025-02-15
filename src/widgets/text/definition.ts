import { dmeConfig, generalSettings, getCommonSettings } from '../..';
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
    createBlock: (): DMEData.CreatedBlock<EntityText> => {
      return {
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
      parameters: { initHeight: 400 },
    },
    {
      name: 'Text color',
      identifier: 'text-color',
      property: 'settings.color',
      settingComponent: 'color',
      parameters: {
        colorGroup: 'text',
      },
      category: 'style',
    },
  ],
};

export default TextWidget;
