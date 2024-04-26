import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../../core';
import type { EntityAccordion } from './entity';

const AccordionWidget: DME.Widget = {
  category: 'layout',
  icon: 'TextFormatOutlined',
  name: 'Accordion',
  type: 'accordion',
  events: {
    createBlock: (): DMEData.Block<EntityAccordion> => {
      return {
        id: nanoid(),
        type: 'accordion',
        data: null,
        children: [
          {
            meta: {
              tabKey: '1',
              title: 'Accordion1',
            },
            children: [
              { type: 'heading', id: nanoid(), data: { value: 'Tab1 Title', level: 2 } },
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
              { type: 'heading', id: nanoid(), data: { value: 'Tab2 Title', level: 2 } },
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
  ],
};

export default AccordionWidget;
