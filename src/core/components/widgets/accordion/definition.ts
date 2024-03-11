import { nanoid } from 'nanoid';

import type { EntityAccordion } from './entity';
import type { DMEData } from 'Core/types/dmeditor';
import type { DME } from 'Src/core/types/dmeditor';

const AccordionWidget: DME.Widget = {
  category: 'layout',
  icon: 'TextFormatOutlined',
  name: 'Accordion',
  type: 'accordion',
  events: {
    createBlock: (): DMEData.Block<EntityAccordion> => {
      return {
        id: nanoid(),
        type: 'hero-text',
        data: {},
        children: [
          {
            id: nanoid(),
            type: 'heading',
            data: {
              value: 'Heading1',
              level: 2,
            },
          },
          {
            id: nanoid(),
            type: 'list',
            data: {},
            children: [
              {
                id: nanoid(),
                type: 'heading',
                data: {
                  value: 'Heading 2',
                  level: 2,
                },
              },
            ],
          },
        ],
      };
    },
    updateData: () => {},
  },
  settings: [
    // {
    //   name: 'Hero position',
    //   property: '.heroPosition',
    //   settingComponent: 'button-group',
    //   parameters: {
    //     options: [
    //       { text: 'Left', value: 'left' },
    //       { text: 'Right', value: 'right' },
    //     ],
    //   },
    // },
  ],
};

export default AccordionWidget;
