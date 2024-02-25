import { nanoid } from 'nanoid';

import { EntityText } from './entity';
import { DME, DMEData } from 'Core/types';

const TextWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  icon: 'TextFormatOutlined',
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
              children: [
                { text: 'This is editable ' },
                { text: 'rich', bold: true },
                { text: ' text, ' },
                { text: 'much', italic: true },
                { text: ' better than a ' },
                { text: '<textarea>', code: true },
                { text: '!' },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: "Since it's rich text, you can do things like turn a selection of text ",
                },
                { text: 'bold', bold: true },
                {
                  text: ', or add a semantically rendered block quote in the middle of the page, like this:',
                },
              ],
            },
            {
              type: 'block-quote',
              children: [{ text: 'A wise quote.' }],
            },
            {
              type: 'paragraph',
              align: 'center',
              children: [{ text: 'Try it out for yourself!' }],
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
