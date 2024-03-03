import { nanoid } from 'nanoid';

import { EntityText } from './entity';
import { DME, DMEData } from 'Core/types';

const TextWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'text',
  name: 'Text',
  type: 'text',
  events: {
    createBlock: (): DMEData.Block<EntityText> => {
      return {
        id: nanoid(),
        type: 'text',
        data: {
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'Sample text' }],
            },
          ],
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: '',
      property: '.value',
      settingComponent: 'rich-text',
    },
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

export default TextWidget;
