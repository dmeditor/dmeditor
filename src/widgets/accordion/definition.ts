import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { generalSettings } from '../../core/setting-panel/property-setting';
import type { EntityAccordion } from './entity';

const AccordionWidget: DME.Widget = {
  category: 'intractive',
  icon: 'TextFormatOutlined',
  name: 'Accordion',
  type: 'accordion',
  events: {
    createBlock: (): DMEData.Block<EntityAccordion> => {
      return {
        id: nanoid(),
        type: 'accordion',
        data: {},
        children: [
          {
            meta: {
              tabKey: '1',
              title: 'Accordion1',
            },
            children: [
              {
                type: 'text',
                id: '2',
                data: {
                  value: [
                    {
                      type: 'paragraph',
                      children: [{ text: 'Sample text' }],
                    },
                  ],
                },
              },
            ],
          },
          {
            meta: {
              tabKey: '2',
              title: 'Accordion2',
            },
            children: [
              {
                type: 'text',
                id: '2',
                data: {
                  value: [
                    {
                      type: 'paragraph',
                      children: [{ text: 'Sample text' }],
                    },
                  ],
                },
              },
            ],
          },
        ],
      };
    },
  },
  settings: [
    {
      name: '',
      property: '.children.meta',
      custom: true,
      settingComponent: 'accordion',
    },
    ...generalSettings,
  ],
};

export default AccordionWidget;
