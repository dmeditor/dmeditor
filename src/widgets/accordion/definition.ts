import type { DME, DMEData } from '../..';
import { generalSettings, getCommonSettings, i18n } from '../..';
import type { AccordtionChildType, EntityAccordion } from './entity';

const AccordionWidget: DME.Widget = {
  category: 'interactive',
  icon: 'accordion',
  name: i18n('Accordion', 'widget'),
  type: 'accordion',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityAccordion, AccordtionChildType[]> => {
      return {
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
    ...getCommonSettings(),
  ],
};

export default AccordionWidget;
