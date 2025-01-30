import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, getWidgetVariant, i18n } from '../..';
import { EntityContentView } from './entity';

export const contentViewDefinition: DME.Widget = {
  category: 'design',
  icon: 'content-view',
  name: i18n('Content view', 'widget'),
  type: 'content-view',
  widgetType: 'widget',
  canDependentOn: ['menu'],
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityContentView> => {
      return {
        type: 'content-view',
        data: {
          view: 'block',
          dataSource: {
            type: 'fixed',
            sourceData: {},
          },
        },
      };
    },
  },
  settings: [
    {
      name: 'Data source',
      settingComponent: 'data-source',
      property: '.dataSource',
    },

    {
      name: 'View',
      settingComponent: 'select',
      property: '.view',
      parameters: {
        optionsFrom: 'widgets/content-view/views',
      },
    },
    ...getCommonSettings(),
    ,
  ],
};
