import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, getWidgetVariant, i18n } from '../..';
import { EntityModule } from './EntityModule';

export const moduleDefinition: DME.Widget = {
  category: 'interactive',
  icon: 'module',
  name: i18n('Module', 'widget'),
  type: 'module',
  widgetType: 'widget',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityModule> => {
      return {
        data: {
          module: '',
        },
        type: 'module',
      };
    },
  },
  settings: [],
};
