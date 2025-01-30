import { getCommonSettings } from 'dmeditor/core/setting-panel/property-setting';

import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getWidgetVariant, i18n } from '../..';
import { EntityLine } from './entity';

const lineWidget: DME.Widget = {
  category: 'design',
  icon: 'line',
  name: i18n('Line', 'widget'),
  type: 'line',
  events: {
    createBlock: (variant?: string): DMEData.CreatedBlock<EntityLine> => {
      return {
        data: {
          settings: {
            height: 1,
            color: '#999999',
            general: { padding: 10 },
          },
        },
        type: 'line',
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Line color',
      identifier: 'line-color',
      property: 'settings.color',
      settingComponent: 'color',
      parameters: {
        colorGroup: 'background',
      },
    },
    {
      name: 'Line height',
      identifier: 'line-height',
      property: 'settings.height',
      settingComponent: 'range',
      parameters: {
        min: 1,
        max: 100,
      },
    },
    ...getCommonSettings('none', [
      'container-padding',
      'container-margin-top',
      'container-background-color',
      'container-full-width',
      'container-full-width-content',
    ]),
  ],
};

export default lineWidget;
