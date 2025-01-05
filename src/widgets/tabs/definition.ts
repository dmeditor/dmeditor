import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { generalSettings, i18n } from '../..';
import type { EntityTabsBlock, EntityTabsData } from './entity';

const TabsWidget: DME.Widget = {
  category: 'interactive',
  icon: 'tabs',
  name: i18n('Tabs', 'widget'),
  type: 'tabs',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityTabsData, EntityTabsBlock[]> => {
      return {
        data: {},
        type: 'tabs',
        children: [
          {
            meta: {
              tabKey: 't1',
              title: 'Tab1',
            },
            children: [
              { type: 'heading', id: nanoid(), data: { value: 'Tab1 Title', level: 2 } },
              {
                type: 'text',
                id: nanoid(),
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
              tabKey: 't2',
              title: 'Tab2',
            },
            children: [
              { type: 'heading', id: nanoid(), data: { value: 'Tab2 Title', level: 2 } },
              {
                type: 'text',
                id: nanoid(),
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
    {
      property: 'settings.general.identifier',
      name: 'Block Identifier',
      settingComponent: 'input',
      description:
        'Identifier in location query for direct access. eg. in ?tab=t1 where tab is the identifier. <br /><br /> Empty mean no need for direct access',
      parameters: {
        updateOnUnfocus: true,
      },
    },
    ...generalSettings,
  ],
};

export default TabsWidget;
