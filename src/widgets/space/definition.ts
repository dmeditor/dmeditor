import type { DME, DMEData } from '../..';
import { dmeConfig, generalSettings, getCommonSettings, getWidgetVariant, i18n } from '../..';
import { EntitySpace } from './entity';

const spaceWidget: DME.Widget = {
  category: 'design',
  icon: 'button', //todo: change icon
  name: i18n('Space', 'widget'),
  type: 'space',
  events: {
    createBlock: (variant?: string): DMEData.CreatedBlock<EntitySpace> => {
      return {
        data: {
          settings: {
            height: 20,
            general: {
              background: '#cccccc',
            },
          },
        },
        type: 'space',
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Height',
      property: 'settings.height',
      settingComponent: 'distance',
      parameters: {
        min: 1,
        max: 200,
        allowedUnit: 'px',
      },
    },
    ...getCommonSettings('none', [
      'container-background-color',
      'container-background-image',
      'container-margin-top',
      'container-full-width',
    ]),
  ],
};

export default spaceWidget;
