import { dmeConfig } from 'dmeditor';
import { DME, DMEData } from 'dmeditor/types';
import { nanoid } from 'nanoid';

import { EntityText } from './entity';

const TextWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'text',
  name: 'Text',
  type: 'text',
  events: {
    createBlock: (): DMEData.Block<EntityText> => {
      const defaultStyle = dmeConfig.widgets['text']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      return {
        id: nanoid(),
        type: 'text',
        ...styleObj,
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
