import type { DME, DMEData } from '../..';
import { generalSettings } from '../..';
import type { EntityTabsBlock, EntityTabsData } from './entity';

const TabsWidget: DME.Widget = {
  allowedTypes: ['heading', 'text', 'image'],
  category: 'intractive',
  icon: 'tabs',
  name: 'Tabs',
  type: 'tabs',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityTabsData, EntityTabsBlock> => {
      return {
        data: {},
        style: { _: 'default' },
        type: 'tabs',
        children: [
          {
            meta: {
              tabKey: '1',
              title: 'Tab1',
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
              title: 'Tab2',
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
    updateData: () => {},
  },
  settings: [
    {
      name: '',
      property: '.children.meta',
      custom: true,
      settingComponent: 'tabs',
    },
    ...generalSettings,
  ],
};

export default TabsWidget;
