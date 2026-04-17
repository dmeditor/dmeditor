import type { DME, DMEData } from '../..';
import { generalSettings, getCommonSettings, i18n } from '../..';
import type { AccordtionChildType, EntityAccordion } from './entity';

const AccordionWidget: DME.Widget = {
  category: 'interactive',
  icon: 'accordion',
  get name() {
    return i18n('Accordion', 'widget');
  },
  type: 'accordion',
  widgetType: 'mixed',
  editMask: true,
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
    {
      get name() {
        return i18n('Allow multiple open', 'property-label');
      },
      property: '.multiOpen',
      settingComponent: 'switch',
    },
    {
      get name() {
        return i18n('Icon position', 'property-label');
      },
      property: 'settings.iconOnLeft',
      settingComponent: 'button-group',
      parameters: {
        defaultSelected: 'right',
        options: [
          { text: 'left', value: 'left' },
          { text: 'right', value: 'right' },
        ],
      },
      category: 'style',
    },
  ],
};

export default AccordionWidget;
